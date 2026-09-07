import React, { useState, useEffect } from 'react';

export const AnimatedHeading = ({
  text = 'Where families thrive\nand dream homes begin.',
  className = 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 text-white leading-tight',
  charDelay = 25,
  initialDelay = 150,
  duration = 450
}) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  const lines = text.split('\n');
  let globalCharIndex = 0;

  return (
    <h1
      className={className}
      style={{ letterSpacing: '-0.03em' }}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        return (
          <span key={lineIndex} className="block">
            {words.map((word, wordIndex) => {
              return (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.split('').map((char, charIndex) => {
                    const currentDelay = (globalCharIndex++) * charDelay;
                    return (
                      <span
                        key={charIndex}
                        className="inline-block"
                        style={{
                          opacity: animated ? 1 : 0,
                          transform: animated ? 'translateX(0)' : 'translateX(-14px)',
                          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                          transitionDelay: `${currentDelay}ms`
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                  {wordIndex < words.length - 1 && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
};

export default AnimatedHeading;