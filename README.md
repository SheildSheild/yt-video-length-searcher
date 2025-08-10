# YouTube Video Length Searcher

A tiny web app that lets you search YouTube and filter results by **video length**.  
Built for fun, practice, and because YouTube’s “> 20 minutes” filter isn’t enough.

**Live demo:** [https://sheildsheild.github.io/yt-video-length-searcher](https://sheildsheild.github.io/yt-video-length-searcher)

> **Heads up:** this uses the YouTube Data API. Daily quota is small, so if it’s already been used up… try again tomorrow 😭

---

## Stack

- **Frontend:** React, Material UI, Radix UI  
- **Backend:** Node.js + Express (proxy to YouTube Data API v3)  
- **Deploy:** Frontend on GitHub Pages, Backend on Render  

---

## How it works

1. You type a query and pick min/max length.  
2. The frontend calls the backend: GET /search?q=<query>&minLength=<seconds>&maxLength=<seconds>
3. The backend hits the YouTube API, fetches video IDs, grabs details, filters by duration, and returns a tidy list.  
4. You get thumbnails, titles, and formatted times (`1:23:45` or `54:21` if no hours).  

---
