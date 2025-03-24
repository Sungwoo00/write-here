import { useState } from 'react';
import { tm } from '@/utils/tw-merge';
import React from 'react';

interface DiaryPlaceTypeSelectorProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function DiaryPlaceTypeSelector({ onChange }: DiaryPlaceTypeSelectorProps) {
  const [selectedPlace, setSelectedPlace] = useState('');

  const getColorClass = () => {
    switch (selectedPlace) {
      case 'nature':
        return 'bg-[var(--card-green)]';
      case 'cafe':
        return 'bg-[var(--card-brown)]';
      case 'restaurant':
        return 'bg-[var(--card-orange)]';
      case 'water':
        return 'bg-[var(--card-blue)]';
      case 'culture':
        return 'bg-[var(--card-pink)]';
      case 'urban':
        return 'bg-[var(--card-gray)]';
      case 'accommodation':
        return 'bg-[var(--card-purple)]';
      default:
        return 'bg-white';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlace(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div
      className={tm(
        'flex items-center pt-2 pb-2 text-xs border-b-1 border-[var(--logo-green)] dark:border-gray-700 cursor-pointer',
        'lg:text-base',
        getColorClass()
      )}
    >
      <label htmlFor="underline_select" className="sr-only">
        장소 타입 선택하기
      </label>

      <select
        id="underline_select"
        value={selectedPlace}
        onChange={handleChange}
        className={tm(
          'flex-grow px-0 text-xs bg-transparent font-[Paperlogy]',
          'lg:text-base',
          'border-0 appearance-none',
          'focus:outline-none focus:ring-0 peer',
          'cursor-pointer'
        )}
      >
        <option value="" disabled>
          -- 장소 선택 plz --
        </option>
        <option value="nature">산, 공원, 숲</option>
        <option value="cafe">카페</option>
        <option value="restaurant">식당</option>
        <option value="water">바다, 호수, 강</option>
        <option value="culture">문화시설</option>
        <option value="urban">도심, 랜드마크</option>
        <option value="accommodation">숙박</option>
      </select>

      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={tm(
          'transform rotate-90 ml-1 pointer-events-none lg:hidden text-[var(--logo-green)]',
          getColorClass()
        )}
      >
        <g clipPath="url(#clip0_217_2321)">
          <path
            d="M6.23 20.23L8 22L18 12L8 2L6.23 3.77L14.46 12L6.23 20.23Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_217_2321">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={tm(
          'transform rotate-90 ml-1 pointer-events-none hidden lg:block text-[var(--logo-green)]',
          getColorClass()
        )}
      >
        <g clipPath="url(#clip0_217_2321)">
          <path
            d="M6.23 20.23L8 22L18 12L8 2L6.23 3.77L14.46 12L6.23 20.23Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_217_2321">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default DiaryPlaceTypeSelector;
