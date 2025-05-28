import { useEffect, useState } from 'react';

interface ProgressBubbleProps {
  total: number;
  uploaded?: number;      // 0‒total
  onComplete: () => void;
}

export default function ProgressBubble(props: ProgressBubbleProps) {
  const { total, onComplete } = props;
  const [uploaded, setUploaded] = useState(props.uploaded ?? 0);

  useEffect(() => {
    if (props.uploaded !== undefined) {
      setUploaded(props.uploaded);
    } else {
      const timer = setInterval(() => {
        setUploaded(prev => {
          if (prev >= total) {
            clearInterval(timer);
            return total;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [total, props.uploaded]);

  useEffect(() => {
    if ((props.uploaded ?? uploaded) === total) onComplete();
  }, [uploaded, total, onComplete, props.uploaded]);

  return (
    <div className="flex items-center gap-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${(uploaded / total) * 100}%` }}
        />
      </div>
      <span className="text-sm text-gray-600">{Math.round((uploaded / total) * 100)}%</span>
    </div>
  );
} 