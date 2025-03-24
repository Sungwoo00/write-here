import { useRef, useState, useEffect, useId } from 'react';
import useTableStore from '@/store/DiaryData';
import { tm } from '@/utils/tw-merge';
import { useLocation } from 'react-router';
import { useMapStore } from '@/store/Map';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldId = useId();
  const location = useLocation();
  const hasSearch = ['/write-here-map', '/diary', '/public-diary'].includes(
    location.pathname
  );
  const setDiarySearchKeyword = useTableStore((s) => s.setDiarySearchKeyword);
  const { setMapSearchKeyword, setAddMarkerMode } = useMapStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname === '/write-here-map') {
      setMapSearchKeyword(input);
      setAddMarkerMode(false);
    } else {
      setDiarySearchKeyword(input);
    }
    setShowSearch(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        setShowSearch(false);
      }
    }, 100);
  };

  // 검색창 열릴 때 input에 focus
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <header className="fixed top-0 w-full h-16 px-4 z-[100] bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-between">
      {showSearch ? (
        <div className="relative flex items-center w-full gap-2">
          <form onSubmit={handleSubmit} className="flex-grow relative">
            <div className="relative w-full h-10">
              <input
                ref={inputRef}
                id={fieldId}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onBlur={handleBlur}
                placeholder=" "
                className="peer w-full h-full px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--logo-green)] text-sm"
              />
              <label
                htmlFor={fieldId}
                className={tm(
                  'absolute text-sm text-[var(--light-gray)]',
                  input
                    ? 'opacity-0 scale-0 invisible pointer-events-none'
                    : 'opacity-100 scale-100 visible left-4 top-2.5'
                )}
              >
                검색어를 입력하세요
              </label>

              {input && (
                <button
                  type="button"
                  onClick={() => setInput('')}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-black"
                  aria-label="입력 초기화"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <>
          {hasSearch ? (
            <button
              onClick={() => {
                setShowSearch(true);
                setInput('');
              }}
              aria-label="검색"
              className="w-6 h-6 cursor-pointer"
            >
              {/* 검색 아이콘 */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#417b45"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <div></div>
          )}

          {/* 로고 */}
          <img src="/logo.webp" alt="여기적기 로고" className="h-full w-auto" />

          {/* 알림 아이콘 */}
          <button aria-label="알림" className="w-6 h-6 cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                stroke="#417b45"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                stroke="#417b45"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
