import DiaryCard from '@/components/level-2/DiaryCard';
import DiaryRegister from '@/components/level-3/DiaryRegister';
import useTableStore from '@/store/DiaryData';
import { useMapStore } from '@/store/Map';
import { useEffect } from 'react';

function OverlayPanel() {
  const {
    isOverlayOpen,
    closeOverlay,
    markerId,
    setPageModalOpen,
    initTempMarker,
  } = useMapStore();
  const { diaries } = useTableStore();

  const handleButtonClick = () => {
    if (markerId) {
      closeOverlay();
      initTempMarker();
    } else {
      setPageModalOpen(true);
    }
  };

  useEffect(() => {
    return () => {
      closeOverlay();
    };
  }, [closeOverlay]);

  if (!isOverlayOpen) return null;

  return (
    <div
      className="relative z-[100] w-full h-[130%] p-6 bg-white overflow-y-scroll
        lg:fixed lg:inset-y-0 lg:right-0 lg:w-[480px] lg:h-full lg:shadow-lg lg:border-l lg:border-gray-300"
    >
      <button
        onClick={handleButtonClick}
        className="fixed left-2 top-2 lg:absolute lg:left-4 lg:top-4 z-10"
      >
        <img src="/icons/icon-x.svg" alt="닫기 버튼" />
      </button>

      <div className="mt-10">
        {markerId ? (
          diaries
            .filter((diary) => diary.marker_id === markerId)
            .map((diary) => <DiaryCard key={diary.diary_id} diary={diary} />)
        ) : (
          <DiaryRegister />
        )}
      </div>
    </div>
  );
}

export default OverlayPanel;
