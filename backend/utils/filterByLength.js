import { parseDuration } from "./isoDurationToSeconds.js";

export function filterByLength(data, minLength, maxLength, resultsPerPage, currentCount){
    let count = currentCount;
    const filteredVideos = data.items.filter(video => {
        const videoDuration = parseDuration(video.contentDetails.duration);
        const isVideoMatched = videoDuration >= minLength && videoDuration <= maxLength;
        if(currentCount > resultsPerPage - 1) return false;
    
        if(isVideoMatched) {
            currentCount++;
        }
        return isVideoMatched;
    });

    return {filteredVideos, count};
}