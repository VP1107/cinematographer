import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Player from '@vimeo/player';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerContainerRef.current) return;

    // Initialize the Vimeo Player using the SDK
    const player = new Player(playerContainerRef.current, {
      id: 1193650792,
      loop: true,
      autopause: false,
      title: false,
      byline: false,
      portrait: false,
      controls: false,
      transparent: true
    });
    
    playerRef.current = player;

    player.ready().then(() => {
      setPlayerReady(true);
    }).catch((error) => {
      console.warn("Vimeo Player Initialization Error:", error);
    });

    // We can safely ignore the internal 'chapters' error if it still bubbles up, 
    // but initializing via the SDK options usually prevents it.
    
    return () => {
      player.destroy();
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !playerReady) return;
    
    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play().catch(e => console.log('Playback prevented:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Hidden Vimeo Container for Audio */}
      <div 
        ref={playerContainerRef}
        style={{ position: 'fixed', zIndex: -9999, opacity: 0.01, pointerEvents: 'none', width: '10px', height: '10px', overflow: 'hidden' }}
      >
      </div>

      {/* Floating UI Control */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          mixBlendMode: 'difference',
        }}
      >
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--white)',
            cursor: playerReady ? 'pointer' : 'not-allowed',
            opacity: playerReady ? 1 : 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 300ms ease',
          }}
          onMouseEnter={(e) => {
            if (!playerReady) return;
            e.currentTarget.style.borderColor = 'var(--saffron)';
            e.currentTarget.style.color = 'var(--saffron)';
          }}
          onMouseLeave={(e) => {
            if (!playerReady) return;
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.color = 'var(--white)';
          }}
        >
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <span 
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--white-dim)',
            opacity: isPlaying ? 1 : 0.5,
            transition: 'opacity 300ms ease',
            pointerEvents: 'none'
          }}
        >
          Sound {isPlaying ? 'On' : 'Off'}
        </span>
      </div>
    </>
  );
}
