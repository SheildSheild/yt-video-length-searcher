import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");
  const maxQuery = queryParams.get("maxLength");
  const minQuery = queryParams.get("minLength");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchTerm) return;

    async function fetchVideos() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/search?q=${encodeURIComponent(searchTerm)}&minLength=${minQuery}&maxLength=${maxQuery}`);
        const data = await response.json();
        setVideos(data.results || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [searchTerm]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Results for: {searchTerm}</h1>
      {videos.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {videos.map((video, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <h3>{video.snippet?.title}</h3>
              <img
                src={video.snippet?.thumbnails?.medium?.url}
                alt={video.snippet?.title}
                style={{ width: "320px" }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
