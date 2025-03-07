import { tm } from '@/utils/tw-merge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  detail: React.ReactNode;
  buttonConfirmText: string;
  buttonCancelText: string; 
  onConfirm: () => void; 
  onCancel: () => void; 
}

const Modal = ({
  isOpen,
  onClose,
  detail,
  buttonConfirmText,
  buttonCancelText,
  onConfirm,
  onCancel,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={tm(
        'fixed inset-0 flex items-center font-[Paperlogy] justify-center transition-opacity duration-300 z-50 before:absolute before:inset-0 before:bg-[var(--light-gray)]',
        isOpen ? 'before:opacity-50' : 'before:opacity-0'
      )}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--dark-gray)"
        >
          <img src="/icons/icon-x.svg" alt="닫기" className="w-6 h-6" />
        </button>

        {detail}

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[var(--logo-green)] text-white rounded-md hover:bg-[var(--logo-dark-green)]"
          >
            {buttonConfirmText}
          </button>
          <button
            onClick={onCancel}
            className={tm(
              'px-4 py-2 bg-[var(--dark-gray)] text-white rounded-md',
              'hover:bg-[var(--light-gray)]'
            )}
          >
            {buttonCancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
