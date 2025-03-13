import { tm } from '@/utils/tw-merge';

function SubmitButton({ label = '', disable = true }) {
  return (
    <button
      type="submit"
      className={tm(
        'w-full h-9 lg:h-12 text-white font-[HSSanTokki] rounded-md text-base lg:text-lg',
        disable
          ? 'bg-[var(--light-gray)] cursor-not-allowed'
          : 'bg-[var(--logo-green)] cursor-pointer hover:opacity-80 active:bg-[var(--logo-dark-green)]'
      )}
      disabled={disable}
    >
      {label}
    </button>
  );
}

export default SubmitButton;
