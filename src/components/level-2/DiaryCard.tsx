import { IMAGE_PATHS } from '@/constants/imagePaths';
import { tm } from '@/utils/tw-merge';
import Tag from '@/components/level-1/Tag';
import LikeToggle from '@/components/level-1/LikeToggle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Diary } from '@/store/DiaryData';

interface DiaryCardProps {
  diary: Diary;
  showLikeToggle?: boolean;
}

const getCardColor = (placeType: string) => {
  const colors: Record<string, string> = {
    cafe: 'bg-[var(--card-brown)]',
    water: 'bg-[var(--card-blue)]',
    restaurant: 'bg-[var(--card-orange)]',
    accommodation: 'bg-[var(--card-purple)]',
    nature: 'bg-[var(--card-green)]',
    culture: 'bg-[var(--card-pink)]',
    urban: 'bg-[var(--card-gray)]',
  };
  return colors[placeType] || 'bg-[var(--card-gray)]';
};

const DiaryCard = ({ diary, showLikeToggle = false }: DiaryCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const formattedDate = diary.post_date
    ? new Date(diary.post_date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '날짜 없음';

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
  };

  const handleCardClick = () => {
    navigate(`/diary/${diary.diary_id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={tm(
        'm-6 cursor-pointer text-left focus:outline-none',
        'transition-transform duration-200 hover:scale-[1.015]'
      )}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleCardClick();
      }}
    >
      <div
        className={tm(
          'w-[366px] h-[277px] lg:h-[295px] lg:w-[370px] bg-white rounded-2xl shadow-md overflow-hidden',
          'hover:shadow-lg transition-shadow duration-200'
        )}
      >
        {/* 이미지 배경 */}
        <div
          className={tm(
            'relative w-full h-[157px] bg-cover bg-center rounded-t-2xl group'
          )}
          style={{
            backgroundImage: `url(${diary.img?.[0] || IMAGE_PATHS.blueBottle})`,
          }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-200 rounded-t-2xl" />

          {showLikeToggle && (
            <div
              role="button"
              tabIndex={0}
              className="absolute bottom-3 left-3 z-10"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
              }}
            >
              <LikeToggle isToggled={isLiked} onToggle={handleLikeToggle} />
            </div>
          )}
        </div>

        {/* 카드 본문 */}
        <div
          className={tm(
            'w-[366px] h-[120px] lg:h-[138px] lg:w-[370px] p-3 overflow-hidden flex flex-col justify-between',
            getCardColor(diary.place_type)
          )}
        >
          <div className="flex justify-between items-center w-full">
            <h2 className="font-[HSSanTokki] truncate max-w-[70%] text-base lg:text-lg transition-colors duration-200 group-hover:text-white">
              {diary.title}
            </h2>
            <span className="whitespace-nowrap text-xs lg:text-base">
              {formattedDate}
            </span>
          </div>

          <p className="text-xs lg:text-base mt-2 text-[var(--dark-gray)] line-clamp-2 font-[Paperlogy]">
            {diary.content}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto overflow-hidden font-[HSSanTokki]">
            {diary.tag?.map((tag, index) => <Tag key={index} tagText={tag} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;
