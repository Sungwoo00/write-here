import { tm } from '@/utils/tw-merge';
import { useId, useState } from 'react';

interface SignInputProps {
  name?: string;
  type: 'text' | 'password' | 'email';
  value: string;
  label: string;
  isValid?: boolean;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

function SignInput({
  name,
  type,
  value,
  label,
  isValid,
  error,
  onChange,
  onClear,
}: SignInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const fieldId = useId();

  return (
    <div className="relative font-[HSSanTokki] text-sm lg:text-base">
      <div
        className="w-full flex border-2 border-[var(--light-gray)] rounded-lg p-2 lg:p-3
        hover:border-[var(--light-green)] focus-within:border-[var(--logo-green)] focus-within:hover:border-[var(--logo-green)]"
      >
        <input
          name={name}
          id={fieldId}
          type={type === 'password' ? (isVisible ? 'text' : type) : 'text'}
          value={value}
          onChange={onChange}
          className=" w-full focus:outline-none text-[var(--dark-gray)]"
          placeholder=" "
        />
        <label
          htmlFor={fieldId}
          className={tm(
            'absolute text-[var(--light-gray)] align-middle',
            value
              ? 'opacity-0 -left-100'
              : 'opacity-100 left-2.5 top-2.5 lg:left-4 lg:top-3.5',
            'peer-placeholder-shown:opacity-100'
          )}
        >
          {label}
        </label>
        {value && (
          <div className="flex items-center gap-2 ml-2">
            {type === 'password' && (
              <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                className="flex items-center justify-center"
                aria-label={isVisible ? '비밀번호 보이기' : '비밀번호 숨기기기'}
              >
                <span
                  className="w-4 h-4 lg:w-6 lg:h-6 bg-[var(--light-gray)]"
                  style={{
                    maskImage: `url(${isVisible ? '/icons/icon-eye-open.svg' : '/icons/icon-eye-slash.svg'})`,
                    WebkitMaskImage: `url(${isVisible ? '/icons/icon-eye-open.svg' : '/icons/icon-eye-slash.svg'})`,
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
      <p
        className={tm(
          'text-xs lg:text-sm mt-1',
          'absolute px-2',
          isValid ? 'text-[var(--logo-green)]' : 'text-red-500'
        )}
      >
        {error}
      </p>
    </div>
  );
}

export default SignInput;
