import { useEffect, useState } from 'react';
import Modal from '@/components/level-2/Modal';
import supabase from '@/utils/supabase';

const infoData = [
  { title: '앱 정보', content: 'v1.01' },
  {
    title: <span className="whitespace-nowrap">Developer와 Contact</span>,
    content: (handleOpenModal: (title: string, qrSrc?: string) => void) => (
      <div className="flex flex-col gap-2">
        <button
          className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-[Paperlogy] whitespace-nowrap"
          onClick={() => handleOpenModal('Developer와 Contact', '/qrcode.jpg')}
        >
          Developer와 contact
        </button>
      </div>
    ),
  },
  {
    title: '공지 사항',
    content: (
      <button
        className="text-blue-500 underline cursor-pointer font-[Paperlogy]"
        onClick={() => (window.location.href = 'https://example.com/notice')}
      >
        페이지 이동
      </button>
    ),
  },
  { title: '크레딧', content: '멋쟁이 사자들에게 깊은 감사,,, !' },
  { title: 'Location', content: 'USA' },
  {
    title: '더보기',
    content: (handleOpenModal: (title: string) => void) => (
      <div className="flex flex-col gap-2 text-left">
        <button
          className="text-[var(--icon-red)] hover:underline cursor-pointer font-[Paperlogy] text-left"
          onClick={() => handleOpenModal('정말 로그아웃 하시겠습니까?')}
        >
          로그아웃
        </button>
        <button
          className="text-[var(--icon-red)] hover:underline cursor-pointer font-[Paperlogy] text-left"
          onClick={() => handleOpenModal('정말 회원탈퇴 하시겠습니까? 정말? ')}
        >
          회원탈퇴
        </button>
      </div>
    ),
  },
];

const InfoSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'qr' | 'confirm' | null>(null);
  const [qrImageSrc, setQrImageSrc] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => Promise<void>>(
    () => async () => {}
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //  하나의 모달에서 QR 또는 로그아웃/탈퇴 구분
  const handleOpenModal = (title: string, qrSrc?: string) => {
    setModalTitle(title);
    setQrImageSrc(qrSrc || '');
    setModalType(qrSrc ? 'qr' : 'confirm');

    if (!qrSrc) {
      // 로그아웃 & 회원탈퇴 처리
      setOnConfirm(() => async () => {
        if (title === '정말 로그아웃 하시겠습니까?') {
          const { error } = await supabase.auth.signOut();
          if (error) console.error('로그아웃 실패:', error.message);
          window.location.href = '/';
        } else if (title === '정말 회원탈퇴 하실거에요? 정말?') {
          const { error } = await supabase.rpc('delete_current_user');
          if (error) console.error('회원탈퇴 실패:', error.message);
          window.location.href = '/good-bye';
        }
      });
    }

    setIsModalOpen(true);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-xl font-[Paperlogy]">
      {isMobile ? (
        <div className="divide-y">
          {infoData.map((item, index) => (
            <div key={index}>
              <button
                className="w-full text-left py-3 font-bold flex justify-between items-center whitespace-nowrap"
                onClick={() => toggleAccordion(index)}
              >
                {item.title}
                <svg
                  className="w-5 h-5 text-gray-600 transition-transform duration-200"
                  style={{
                    transform:
                      openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="py-2 text-gray-700">
                  {typeof item.content === 'function'
                    ? item.content(handleOpenModal)
                    : item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full text-left border-collapse">
          <tbody>
            {infoData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 font-bold">{item.title}</td>
                <td className="py-3 text-gray-700">
                  {typeof item.content === 'function'
                    ? item.content(handleOpenModal)
                    : item.content}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/*  하나의 모달로 QR & 로그아웃/탈퇴 관리 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonConfirmText={modalType === 'qr' ? '확인' : '확인'}
        buttonCancelText={modalType === 'qr' ? '취소' : '취소'}
        onConfirm={modalType === 'qr' ? () => setIsModalOpen(false) : onConfirm}
      >
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
          {modalType === 'qr' && qrImageSrc && (
            <img
              src={qrImageSrc}
              alt={`${modalTitle} QR 코드`}
              className="w-40 h-40 mx-auto"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default InfoSection;
