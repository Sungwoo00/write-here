import { useEffect, useState } from 'react';
import Modal from '@/components/level-2/Modal';

const infoData = [
  { title: '앱 정보', content: 'v1.01' },
  {
    title: <span className="whitespace-nowrap">개발자에게 커피 사주기</span>,
    content: (handleOpenModal: (title: string, qrSrc: string) => void) => (
      <div className="flex flex-col gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-lg font-[Paperlogy] whitespace-nowrap"
          onClick={() =>
            handleOpenModal('토스로 커피 사주기 (Fake QR)', '/fakeQr.png')
          }
        >
          토스로 커피 사주기
        </button>
        <button
          className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-[Paperlogy] whitespace-nowrap"
          onClick={() =>
            handleOpenModal(
              '카카오 페이로 커피 사주기 (Fake QR) ',
              '/fakeQr.png'
            )
          }
        >
          카카오 페이로 커피 사주기
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
];

const InfoSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrTitle, setQrTitle] = useState('');
  const [qrImageSrc, setQrImageSrc] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleOpenModal = (title: string, qrSrc: string) => {
    setQrTitle(title);
    setQrImageSrc(qrSrc);
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
                  xmlns="http://www.w3.org/2000/svg"
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonConfirmText="닫기"
        buttonCancelText=""
        onConfirm={() => setIsModalOpen(false)}
      >
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold mb-4">{qrTitle}</h2>
          {qrImageSrc && (
            <img
              src={qrImageSrc}
              alt={`${qrTitle} QR 코드`}
              className="w-40 h-40 mx-auto"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default InfoSection;
