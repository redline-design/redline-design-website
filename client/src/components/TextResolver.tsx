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
  const [displayText, setDisplayText] = useState(text);
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
    let intervals: NodeJS.Timeout[] = [];
    let isActive = true;

    const resolveNextCharacter = () => {
      if (!isActive || currentIndex >= text.length) {
        setDisplayText(text);
        return;
      }

      let iterationCount = 0;
      const partialString = text.substring(0, currentIndex);

      const randomizeInterval = setInterval(() => {
        if (!isActive) {
          clearInterval(randomizeInterval);
          return;
        }
        
        if (iterationCount < iterations) {
          const randomChar = characters[Math.floor(Math.random() * characters.length)];
          setDisplayText(partialString + randomChar + text.substring(currentIndex + 1));
          iterationCount++;
        } else {
          clearInterval(randomizeInterval);
          setDisplayText(partialString + text[currentIndex] + text.substring(currentIndex + 1));
          currentIndex++;
          setTimeout(() => {
            if (isActive) {
              resolveNextCharacter();
            }
          }, 0);
        }
      }, timeout);
      
      intervals.push(randomizeInterval);
    };

    resolveNextCharacter();

    return () => {
      isActive = false;
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [started, text, characters, timeout, iterations]);

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
}
