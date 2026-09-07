import React, { useRef, useEffect, useState } from 'react';

export const ScrollReveal = ({
  children,
  animation = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.12,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    switch (animation) {
      case 'left':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
          transition: baseTransition
        };
      case 'right':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
          transition: baseTransition
        };
      case 'zoom':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.93)',
          transition: baseTransition
        };
      case 'fade':
        return {
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
        };
      case 'up':
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
          transition: baseTransition
        };
    }
  };

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={getAnimationStyles()}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
