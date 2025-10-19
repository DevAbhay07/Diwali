import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

interface EnvatoStyleCardProps {
  name: string;
}

const EnvatoStyleCard = ({ name }: EnvatoStyleCardProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="envato-card-container">
      {/* Animated background sparkles */}
      <div className="sparkle-background">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className={`sparkle sparkle-${(i % 4) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main card content */}
      <div className={`card-content ${showContent ? 'animate-in' : ''}`}>
        {/* Red lotus mandala background */}
        <div className="lotus-mandala">
          <div className="lotus-petals">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={`petal petal-${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Happy Diwali text */}
        <div className="happy-diwali-container">
          <h1 className="happy-diwali-main">Happy Diwali</h1>
        </div>

        {/* Decorative Diya */}
        <div className="diya-ornament">
          <div className="diya-body">
            <div className="diya-flame">
              <div className="flame-outer"></div>
              <div className="flame-inner"></div>
            </div>
            <div className="diya-base"></div>
            <div className="diya-decorations">
              <div className="decoration decoration-1">✦</div>
              <div className="decoration decoration-2">❋</div>
              <div className="decoration decoration-3">✦</div>
            </div>
          </div>
        </div>

        {/* User name (replaces envato) */}
        <div className="user-name-container">
          <div className="envato-logo">
            <span className="logo-circle">◉</span>
            <span className="user-name">{name || 'Your Name'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvatoStyleCard;