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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex <= text.length) {
        let iterationCount = 0;
        const randomInterval = setInterval(() => {
          if (iterationCount < iterations) {
            const partialString = text.substring(0, currentIndex);
            const randomChar = characters[Math.floor(Math.random() * characters.length)];
            setDisplayText(partialString + randomChar);
            iterationCount++;
          } else {
            clearInterval(randomInterval);
            setDisplayText(text.substring(0, currentIndex));
            setCurrentIndex(currentIndex + 1);
          }
        }, timeout);

        return () => clearInterval(randomInterval);
      } else {
        setDisplayText(text);
      }
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, characters, timeout, iterations, delay]);

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
}
