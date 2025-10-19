import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

const FestiveAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Create a simple festive sound using Web Audio API
  const createFestiveSound = () => {
    if (!audioContext) return;

    // Create celebratory chime sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Create a pleasant bell-like sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // G5
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  const initializeAudio = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
    }
  };

  const playFestiveSound = () => {
    initializeAudio();
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        createFestiveSound();
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 1000);
      });
    } else if (audioContext) {
      createFestiveSound();
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 1000);
    }
  };

  return (
    <div className="festive-audio-controls">
      <button
        onClick={playFestiveSound}
        className={`audio-button ${isPlaying ? 'playing' : ''}`}
        title="Play festive sound"
      >
        {isPlaying ? '🔊' : '🔇'}
        <span className="audio-label">
          {isPlaying ? 'Playing...' : 'Play Sound'}
        </span>
      </button>
      
      <style jsx>{`
        .festive-audio-controls {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        .audio-button {
          background: linear-gradient(45deg, #ff6b35, #f7931e);
          border: none;
          border-radius: 50px;
          padding: 12px 20px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .audio-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }
        
        .audio-button.playing {
          animation: pulse 0.5s ease-in-out infinite alternate;
        }
        
        .audio-label {
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        @keyframes pulse {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.05);
          }
        }
        
        @media (max-width: 768px) {
          .festive-audio-controls {
            bottom: 10px;
            right: 10px;
          }
          
          .audio-button {
            padding: 10px 16px;
            font-size: 0.9rem;
          }
          
          .audio-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FestiveAudio;