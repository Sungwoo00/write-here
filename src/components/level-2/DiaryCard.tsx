import { Tables } from '@/types/database.types';
import { IMAGE_PATHS } from '@/constants/imagePaths';
import { tm } from '@/utils/tw-merge';
import Tag from '@/components/level-1/Tag';
import LikeToggle from '@/components/level-1/LikeToggle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DiaryCardProps {
  diary: Tables<'diaries'>;
}

// place type에 따라 카드 배경 색상 다르게 적용
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

const DiaryCard = ({ diary }: DiaryCardProps) => {
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

  // 다이어리 클릭 시 디테일 페이지로 이동
  const handleCardClick = () => {
    navigate(`/diary/${diary.id}`);
  };

  return (
    <button
      className="m-6 cursor-pointer text-left focus:outline-none"
      onClick={handleCardClick}
      type="button"
    >
      <div className="w-[366px] h-[277px] lg:h-[295px] lg:w-[370px] bg-white rounded-2xl shadow-md overflow-hidden">
        {/* 이미지 배경 */}
        <div
          className={tm(
            'relative w-full h-[157px] bg-cover bg-center rounded-t-2xl'
          )}
          style={{
            backgroundImage: `url(${diary.img?.[0] || IMAGE_PATHS.blueBottle})`,
          }}
        >
          <div className="absolute bottom-3 left-3">
            <LikeToggle isToggled={isLiked} onToggle={handleLikeToggle} />
          </div>
        </div>

        {/* place type에 따라 동적으로 카드 배경 색상 적용 */}
        <div
          className={tm(
            'w-[366px] h-[120px] lg:h-[138px] lg:w-[370px] p-3 overflow-hidden flex flex-col justify-between',
            getCardColor(diary.place_type)
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

          <p className="text-xs lg:text-base mt-2 text-[var(--dark-gray)] line-clamp-2 font-[Paperlogy]">
            {diary.content}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto overflow-hidden font-[HSSanTokki]">
            {diary.tag?.map((tag, index) => <Tag key={index} tagText={tag} />)}
          </div>
        </div>
      </div>
    </button>
  );
};

export default DiaryCard;
