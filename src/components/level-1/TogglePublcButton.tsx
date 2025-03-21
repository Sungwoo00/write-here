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

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 ${
          isPublic ? 'bg-[var(--logo-green)]' : 'bg-[var(--light-gray)]'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform transition rounded-full bg-white ${
            isPublic ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span>{isPublic ? '공개' : '비공개'}</span>
    </div>
  );
};

export default TogglePublicButton;
