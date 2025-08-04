import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express from 'express';
import { parseDuration } from '../utils/isoDurationToSeconds.js';

dotenv.config();

const router = express.Router();

router.get('/video', async (req, res) => {
    try {
        const { videoId, minLength: minQuery, maxLength: maxQuery } = req.query;

        if(!videoId) {
            return res.status(400).json({error: 'Missing video ID in query parameters'});
        }

        const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails,snippet&key=${process.env.YT_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if(!data.items || data.items.length === 0) {
            return res.status(404).json({error: 'Video not found'});
        }

        const minLength = parseInt(minQuery) || 0;
        const maxLength = parseInt(maxQuery) || Infinity;

        const videoDuration = data.items[0].contentDetails.duration;
        const durationInSeconds = parseDuration(videoDuration);

        if(durationInSeconds <= maxLength && durationInSeconds >= minLength){
            res.json();
        } else {
            res.json({"message" : "Video is does not fit length parameters"});
        }

    } catch(error){

        console.error('Error fetching video: ', error);
        res.status(500).send('Error fetching video data');
    }
});

export default router;