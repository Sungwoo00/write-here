import { useEffect, useRef, useState } from 'react';
import { getWidth, watchWidth } from '@/utils/width-element';
import { throttle } from 'lodash-es';
import Spring from '@/components/level-1/Spring';
interface RendererSpringProps {
  className?: string;
}

function RendererSpring({ className }: RendererSpringProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [springs, setSprings] = useState<number>(0);
  const springWidth = 28;

  useEffect(() => {
    const initWidth = getWidth(divRef.current);
    const initCount = Math.floor(initWidth / springWidth);
    setSprings(initCount);

    const throttledHandler = throttle((width: number) => {
      const springCount = Math.floor(width / springWidth);
      setSprings(springCount);
    }, 300);

    const cleanup = watchWidth(divRef.current, throttledHandler);

    return () => {
      cleanup();
      throttledHandler.cancel();
    };
  }, []);

  return (
    <div className={`w-auto m-4 ${className}`} ref={divRef}>
      <div className="flex justify-center">
        {[...Array(springs)].map((_, index) => (
          <div key={index} className={index > 0 ? '-ml-1.5' : ''}>
            <Spring width={springWidth} />
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-500"></div>
    </div>
  );
}

export default RendererSpring;
