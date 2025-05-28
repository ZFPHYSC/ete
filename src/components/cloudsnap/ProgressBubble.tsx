import { useState, useEffect } from 'react';

interface ProgressBubbleProps {
  total: number;
  uploaded?: number;   // live count
  megabytes?: string;  // live MB saved
  onComplete: () => void;
}

const ProgressBubble = ({ total, uploaded: propUploaded, megabytes: propMegabytes, onComplete }: ProgressBubbleProps) => {
  const [uploaded, setUploaded] = useState(propUploaded ?? 0);
  const [savedMB, setSavedMB] = useState(parseFloat(propMegabytes ?? '0'));

  useEffect(() => {
    // If we have live props, use them
    if (propUploaded !== undefined) {
      setUploaded(propUploaded);
      setSavedMB(parseFloat(propMegabytes ?? '0'));
      if (propUploaded >= total) {
        setTimeout(onComplete, 500);
      }
      return;
    }

    // Otherwise use the auto-increment fallback
    const timer = setInterval(() => {
      setUploaded(prev => {
        const next = prev + 1;
        setSavedMB(next * 2.3); // Simulate MB saved
        
        if (next >= total) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
        }
        
        return next;
      });
    }, 250);

    return () => clearInterval(timer);
  }, [total, onComplete, propUploaded, propMegabytes]);

  return (
    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-md shadow-sm border border-separator max-w-[80%] animate-bubble-enter">
      <div className="font-rubik text-sm">
        Uploading {uploaded} / {total} • {savedMB.toFixed(1)} MB saved so far...
      </div>
    </div>
  );
};

export default ProgressBubble;
