import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tm from '@/utils/tw-merge';

const NAV_ITEMS = [
  {
    label: '여기적기',
    icon: '/icons/icon-nav-map.svg',
    path: '/write-here-map',
  },
  { label: '일기', icon: '/icons/icon-nav-book.svg', path: '/diary' },
  {
    label: '캘린더',
    icon: '/icons/icon-nav-calendar.svg',
    path: '/diary-calendar',
  },
  {
    label: '공유일기',
    icon: '/icons/icon-nav-people.svg',
    path: '/public-diary',
  },
  { label: '프로필', icon: '/icons/icon-person.svg', path: '/profile' },
];

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav
      className={tm(
        'fixed bg-white border-1 border-black/20 flex items-center justify-around z-50',
        'bottom-0 w-full h-[4rem] min-w-0',
        'lg:top-[8.625rem] lg:left-[2.4375rem] lg:w-[4rem] lg:h-[23rem] lg:flex-col lg:justify-center lg:shadow-xl lg:rounded-xl lg:gap-y-6'
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          currentPath === item.path ||
          (item.path === '/navigation-test' &&
            currentPath === '/navigation-test');

        return (
          <button
            key={item.label}
            className={tm(
              'flex flex-col items-center text-center font-paperlogy transition-all cursor-pointer hover:opacity-80',
              'w-auto min-w-[50px] max-w-[65px] px-0 shrink-0',
              isActive ? 'text-[var(--logo-green)]' : 'text-[var(--dark-gray)]'
            )}
            onClick={() => navigate(item.path)}
          >
            <span
              className={tm(
                'w-[1.75rem] h-[1.75rem] mask-icon',
                isActive ? 'bg-[var(--logo-green)]' : 'bg-[var(--dark-gray)]'
              )}
              style={{
                maskImage: `url(${item.icon})`,
                WebkitMaskImage: `url(${item.icon})`,
              }}
            ></span>
            <span className="text-sm whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationBar;
