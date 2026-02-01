import React, { useEffect, useState } from 'react';

const ReadingProgressBar: React.FC = () => {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight || document.body.scrollHeight;
    const clientHeight = el.clientHeight || document.body.clientHeight;
    
    const height = scrollHeight - clientHeight;
    const scrolled = (scrollTop / height) * 100;
    
    setWidth(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
      <div 
        className="h-full bg-accent shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-100 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;