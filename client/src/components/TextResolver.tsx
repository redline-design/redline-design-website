import { useState, useEffect } from 'react';

interface TextResolverProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  characters?: string;
  timeout?: number;
  iterations?: number;
  delay?: number;
}

export default function TextResolver({
  text,
  className = '',
  style = {},
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?',
  timeout = 50,
  iterations = 10,
  delay = 0
}: TextResolverProps) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    let animationFrameId: number;

    const resolveNextCharacter = () => {
      if (currentIndex >= text.length) {
        setDisplayText(text);
        return;
      }

      let iterationCount = 0;
      const partialString = text.substring(0, currentIndex);

      const randomizeInterval = setInterval(() => {
        if (iterationCount < iterations) {
          const randomChar = characters[Math.floor(Math.random() * characters.length)];
          setDisplayText(partialString + randomChar);
          iterationCount++;
        } else {
          clearInterval(randomizeInterval);
          setDisplayText(partialString + text[currentIndex]);
          currentIndex++;
          animationFrameId = requestAnimationFrame(resolveNextCharacter);
        }
      }, timeout);
    };

    resolveNextCharacter();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [started, text, characters, timeout, iterations]);

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
}
