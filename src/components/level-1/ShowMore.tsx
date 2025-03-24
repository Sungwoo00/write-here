import { useState, useRef, useEffect } from 'react';

interface ShowMoreProps {
  onEdit: () => void;
  onDelete: () => void;
}

function ShowMore({ onEdit, onDelete }: ShowMoreProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        aria-label="더 보기"
        className="bg-transparent border-none p-0 cursor-pointer"
        ref={buttonRef}
      >
        <img
          src="/icons/icon-show-more.svg"
          alt="더 보기"
          className="w-6 h-6"
        />
      </button>

      <div
        ref={dropdownRef}
        className={`absolute right-full mr-2 bg-white border border-[var(--light-gray)] rounded-lg shadow-lg w-40 z-50 transition-all duration-300 ${
          isDropdownOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={onEdit}
          className="w-full text-left p-2 border-b border-[var(--light-gray)] bg-transparent cursor-pointer hover:bg-[var(--light-gray)] rounded-t-lg"
        >
          수정하기
        </button>
        <button
          onClick={onDelete}
          className="w-full text-left text-[var(--icon-red)] p-2 bg-transparent cursor-pointer hover:bg-[var(--light-gray)] rounded-b-lg"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default ShowMore;
