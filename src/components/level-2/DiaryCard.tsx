import { IMAGE_PATHS } from '@/constants/imagePaths';
import { tm } from '@/utils/tw-merge';
import Tag from '@/components/level-1/Tag';
import LikeToggle from '@/components/level-1/LikeToggle';
import useDiaryStore from '@/store/diary';
import { useState } from 'react';

interface DiaryCardProps {
  title: string;
}

const DiaryCard = ({ title }: DiaryCardProps) => {
  const diary = useDiaryStore((state) =>
    state.diaries.find((entry) => entry.title === title)
  );

  const toggleLike = useDiaryStore((state) => state.toggleLike);
  const [isLiked, setIsLiked] = useState(false);

  if (!diary) return null;

  const formattedDate = !isNaN(Date.parse(diary.post_date))
    ? new Date(diary.post_date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '날짜 없음';

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    toggleLike(diary.title);
  };

  return (
    <div className="w-[366px] h-[277px] lg:h-[295px] lg:w-[370px] bg-white rounded-2xl shadow-md overflow-hidden">
      <div
        className={tm(
          'relative w-[366px] h-[157px] bg-cover bg-center rounded-t-2xl'
        )}
        style={{
          backgroundImage: `url(${diary.img.length > 0 ? URL.createObjectURL(diary.img[0]) : IMAGE_PATHS.blueBottle})`,
        }}
      >
        <div className="absolute bottom-3 left-3">
          <LikeToggle isToggled={isLiked} onToggle={handleLikeToggle} />
        </div>
      </div>

      <div
        className={tm(
          'w-[366px] h-[120px] lg:h-[138px] lg:w-[370px] p-3 overflow-hidden bg-[var(--card-brown)]'
        )}
      >
        <div className="flex justify-between items-center w-full">
          <h2 className="font-[HSSanTokki] truncate max-w-[70%] text-base lg:text-lg">
            {diary.title}
          </h2>
          <span className="whitespace-nowrap text-xs lg:text-base">
            {formattedDate}
          </span>
        </div>

        <p className="text-xs lg:text-base mt-2 text-[var(--dark-gray)] line-clamp-2">
          {diary.content}
        </p>

        <div className="flex flex-wrap gap-2 mt-3 overflow-hidden font-[HSSanTokki]">
          {diary.tag.map((tag, index) => (
            <Tag key={index} tagText={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;
