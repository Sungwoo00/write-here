import { tm } from '@/utils/tw-merge';
import React from 'react';

interface TogglePublicButtonProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
  className?: string;
}

const TogglePublicButton: React.FC<TogglePublicButtonProps> = ({
  isPublic,
  onChange,
  className = '',
}) => {
  const handleToggle = () => {
    onChange(!isPublic);
  };

  const privateButtonStyle = isPublic
    ? 'bg-gray-300 text-gray-600 border border-gray-300'
    : 'bg-white text-green-600 border border-green-600';

  const publicButtonStyle = isPublic
    ? 'bg-white text-green-600 border border-green-600'
    : 'bg-gray-300 text-gray-600';

  const LockIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 inline-block mr-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const PeopleIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 inline-block mr-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  return (
    <div className={`flex rounded-sm ${className}`}>
      <button
        type="button"
        onClick={!isPublic ? undefined : handleToggle}
        className={`py-2 px-4 lg:py-3 lg:px-6 flex items-center justify-center rounded-l-md text-xs lg:text-sm whitespace-nowrap ${privateButtonStyle}`}
      >
        <LockIcon /> <span className="inline-block">{tm('비공개')}</span>
      </button>
      <button
        type="button"
        onClick={isPublic ? undefined : handleToggle}
        className={`py-2 px-4 lg:py-3 lg:px-6 flex items-center justify-center rounded-r-md text-xs lg:text-sm whitespace-nowrap ${publicButtonStyle}`}
      >
        <PeopleIcon /> <span className="inline-block">{tm('전체 공개')}</span>
      </button>
    </div>
  );
};

export default TogglePublicButton;
