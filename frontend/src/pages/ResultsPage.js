import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import parseDuration from "../utils/isoDurationToSeconds.js";
import timeFormat from "../utils/secondsToTime.js";
import ryukoImage from "../img/ryuko1.png";
import { IoHome } from "react-icons/io5";

export default function ResultsPage() {
  const navigate = useNavigate();
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");
  const minQuery = queryParams.get("minLength");
  const maxQuery = queryParams.get("maxLength");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchTerm) return;

    async function fetchVideos() {
      try {
        setLoading(true);
        const response = await fetch(`https://http://localhost:8000/search?q=${encodeURIComponent(searchTerm)}&minLength=${minQuery}&maxLength=${maxQuery}`);
        const data = await response.json();
        setVideos(data.results || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [searchTerm, minQuery, maxQuery]);

  if (loading) return <h2>Finding videos...</h2>;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1e1e1e',
      color: '#fff',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '24px'
      }}>
        <button
          onClick={() => navigate('/')}
          aria-label="Home"
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            width: 48,
            height: 48,
            display: 'grid',
            placeItems: 'center',
            background: '#2c2c2c',
            color: '#fff',
            border: '1px solid #444',
            borderRadius: 12,
            boxShadow: '0 6px 16px rgba(0,0,0,.35)',
            cursor: 'pointer',
            transition: 'transform .12s ease, box-shadow .12s ease, background .12s ease',
            zIndex: 1100
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 10px 22px rgba(0,0,0,.5)';
            e.currentTarget.style.background = '#3a3a3a';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,.35)';
            e.currentTarget.style.background = '#2c2c2c';
          }}
        >
          <IoHome style={{ fontSize: 24 }} />
        </button>
        <h2 style={{ marginBottom: 16 }}>Results for: {searchTerm}</h2>

        {videos.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            flex: '1 0 auto',
            gap: '16px',
            marginBottom: 180
          }}>
            {videos.map((video, i) => {
              const href = `https://www.youtube.com/watch?v=${video.id}`;
              const title = video.snippet?.title;
              const thumb = video.snippet?.thumbnails?.medium?.url;
              const duration = timeFormat(parseDuration(video.contentDetails.duration));
              return (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'inherit',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{
                    background: '#242424',
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 6px 16px rgba(0,0,0,.35)',
                    transition: 'transform .12s ease, box-shadow .12s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 22px rgba(0,0,0,.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,.35)';
                  }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={thumb}
                        alt={title}
                        style={{ width: '100%', display: 'block' }}
                      />
                      <span style={{
                        position: 'absolute',
                        right: 8,
                        bottom: 8,
                        background: 'rgba(0,0,0,0.75)',
                        color: '#fff',
                        padding: '2px 6px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {duration}
                      </span>
                    </div>

                    <div style={{ padding: '10px 12px 12px' }}>
                      <h3 style={{
                        margin: 0,
                        fontSize: 16,
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {title}
                      </h3>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
        <img
          src={ryukoImage}
          alt="Ryuko mascot"
          style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: '500px',
              zIndex: 1000
          }}
        />

    </div>
  );
}
