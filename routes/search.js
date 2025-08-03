import express from 'express';
import fetch from 'node-fetch';
import { parseDuration } from '../utils/isoDurationToSeconds.js';
import { filterByLength } from '../utils/filterByLength.js';

const router = express.Router();

router.get('/search', async(req, res) => {
    try{
        const { q, minLength: minQuery, maxLength: maxQuery } = req.query;

        if(!q){
            return res.status(400).json({error: "Missing the search query (q)"})
        }

        const maxLength = parseInt(maxQuery) || Infinity;
        const minLength = parseInt(minQuery) || 0;

        let filteredVideos = [];
        let nextPageToken = '';
        const resultsPerPage = 1;
        const maxPages = 5;
        let pagesFetched = 0;
        let currentCount = 0;
        
        while(filteredVideos.length <= resultsPerPage && pagesFetched < maxPages){ // This will search for videos within the length constraints until it returns a length = resultsPerPage
            const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=id&type=video&maxResults=${resultsPerPage}&q=${encodeURIComponent(q)}$pageToken=${nextPageToken}&key=${process.env.YT_API_KEY}`;

            const searchResponse = await fetch(searchUrl);
            const searchData = await searchResponse.json();
            if (!searchData.items || searchData.items.length === 0) break;

            const videoIds = searchData.items.map(item => item.id.videoId).join(',');

            const detailsURL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${process.env.YT_API_KEY}`;
            const detailsResponse = await fetch(detailsURL);
            const detailsData = await detailsResponse.json();

            const {matchedVideos, count: newCount} = filterByLength(detailsData, minLength, maxLength, resultsPerPage, currentCount);

            filteredVideos = filteredVideos.concat(matchedVideos);
            currentCount = newCount;

            nextPageToken = searchData.nextPageToken || '';
            if(!nextPageToken) break; // no more reults
            pagesFetched ++;
        }
        
        res.json({results: filteredVideos});

    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search videos'})
    }
});

export default router;