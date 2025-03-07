import { tm } from '@/utils/tw-merge';
import { useId, useState } from 'react';

interface SignInputProps {
  type: 'id' | 'pw' | 'email';
  value: string;
  label: string;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

function SignInput({
  type,
  value,
  label,
  error,
  onChange,
  onClear,
}: SignInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const fieldId = useId();

  return (
    <div className="relative font-[HSSanTokki] text-sm lg:text-base">
      <div
        className="w-full flex border-2 border-[var(--light-gray)] rounded-lg p-2
        hover:border-[var(--light-green)] focus-within:border-[var(--logo-green)] focus-within:hover:border-[var(--logo-green)]"
      >
        <input
          id={fieldId}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className=" w-full focus:outline-none text-[var(--dark-gray)]"
          placeholder=" "
        />
        <label
          htmlFor={fieldId}
          className={tm(
            'absolute left-2.5 top-2.5 transition-opacity text-[var(--light-gray)] align-middle',
            value ? 'opacity-0 -left-100' : 'opacity-100',
            'peer-placeholder-shown:opacity-100'
          )}
        >
          {label}
        </label>
        {value && (
          <div className="flex items-center gap-2">
            {type === 'pw' && (
              <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                className="flex items-center justify-center"
                aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보이기'}
              >
                <span
                  className="w-4 h-4 lg:w-6 lg:h-6 bg-[var(--light-gray)]"
                  style={{
                    maskImage: `url(${isVisible ? '/icons/icon-eye-slash.svg' : '/icons/icon-eye-open.svg'})`,
                    WebkitMaskImage: `url(${isVisible ? '/icons/icon-eye-slash.svg' : '/icons/icon-eye-open.svg'})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }}
                />
              </button>
            )}
            <button
              type="button"
              onClick={onClear}
              className="flex items-center justify-center"
            >
              <span
                className="w-4 h-4 lg:w-6 lg:h-6 bg-[var(--light-gray)]"
                style={{
                  maskImage: `url('/icons/icon-x-circle.svg')`,
                  WebkitMaskImage: `url('/icons/icon-x-circle.svg')`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                }}
              />
            </button>
          </div>
        )}
      </div>
      <div className="text-red-500 text-xs lg:text-sm mt-1">{error}</div>
    </div>
  );
}

export default SignInput;
