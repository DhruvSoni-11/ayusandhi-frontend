import React, { useState, useEffect } from 'react';

const motionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const MotionDiv = ({ children, className, variants, initial, animate, exit, transition, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
    transition: `all ${transition?.duration || 0.6}s ease-out`
  };

  return (
    <div className={className} style={animationStyle} {...props}>
      {children}
    </div>
  );
};

export default MotionDiv;