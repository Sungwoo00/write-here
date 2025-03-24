import { useState } from 'react';
import LikeToggle from '@/components/level-1/LikeToggle';

function LikeCounter() {
  const [likeCount, setLikeCount] = useState(999);
  const [isToggled, setIsToggled] = useState(false);

  const handleLikeToggle = (LikedState: boolean) => {
    setIsToggled(LikedState);

    if (LikedState) {
      setLikeCount((prevCount) => prevCount + 1);
    } else {
      setLikeCount((prevCount) => Math.max(0, prevCount - 1));
    }
  };

  return (
    <div className="flex items-center">
      <LikeToggle isToggled={isToggled} onToggle={handleLikeToggle} />
      <output className="text-base p-1" aria-live="polite">
        {likeCount}
      </output>
    </div>
  );
}

export default LikeCounter;
