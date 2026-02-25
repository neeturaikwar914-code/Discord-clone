
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const TRACKS = [
  { id: 'vocals', label: 'VOCALS', color: '#ff00ff' },
  { id: 'drums', label: 'DRUMS', color: '#00f2ff' },
  { id: 'bass', label: 'BASS', color: '#bc13fe' },
  { id: 'other', label: 'OTHER', color: '#ffffff' }
];

export default function StemPlayer({ stems }) {
  const wavesurfers = useRef({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Wavesurfer for each stem
    TRACKS.forEach((track) => {
      const ws = WaveSurfer.create({
        container: `#wave-${track.id}`,
        waveColor: '#1a1a1a',
        progressColor: track.color,
        cursorColor: track.color,
        barWidth: 2,
        height: 50,
        responsive: true,
      });

      // Load the audio file from your backend/S3
      ws.load(stems[track.id]);
      wavesurfers.current[track.id] = ws;
    });

    // Sync playing: wait for all to be ready
    const checkReady = setInterval(() => {
      const allReady = Object.values(wavesurfers.current).every(ws => ws.isReady);
      if (allReady) {
        setIsLoaded(true);
        clearInterval(checkReady);
      }
    }, 500);

    return () => {
      Object.values(wavesurfers.current).forEach(ws => ws.destroy());
    };
  }, [stems]);

  const togglePlay = () => {
    Object.values(wavesurfers.current).forEach(ws => {
      isPlaying ? ws.pause() : ws.play();
    });
    setIsPlaying(!isPlaying);
  };

  const setVolume = (id, val) => {
    wavesurfers.current[id].setVolume(val);
  };

  return (
    <div className="mixer-container fade-in">
      <div className="mixer-header">
        <button className="btn-neon" onClick={togglePlay} disabled={!isLoaded}>
          {isPlaying ? 'PAUSE' : 'PLAY SESSION'}
        </button>
      </div>

      <div className="tracks-grid">
        {TRACKS.map(track => (
          <div key={track.id} className="track-card">
            <span className="track-label">{track.label}</span>
            <div id={`wave-${track.id}`} className="wave-box"></div>
            <div className="controls">
              <input 
                type="range" 
                min="0" max="1" step="0.05" 
                defaultValue="1"
                onChange={(e) => setVolume(track.id, e.target.value)}
              />
              <button onClick={() => setVolume(track.id, 0)}>MUTE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}