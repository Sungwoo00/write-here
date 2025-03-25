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
    searchLocationInfo,
    addMarkerFromSearchResult,
  } = useMapStore();
  const { diaries } = useTableStore();

  const handleButtonClick = () => {
    if (markerId || searchLocationInfo.address_name) {
      closeOverlay();
      initTempMarker();
    } else {
      setPageModalOpen(true);
    }
  };

  const handleAddMarkerClick = () => {
    addMarkerFromSearchResult();
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
        className="absolute left-4 top-4 lg:absolute lg:left-4 lg:top-4 z-10"
      >
        <img src="/icons/icon-x.svg" alt="닫기 버튼" />
      </button>

      <div className="mt-10">
        {markerId ? (
          diaries
            .filter((diary) => diary.marker_id === markerId)
            .map((diary) => <DiaryCard key={diary.diary_id} diary={diary} />)
        ) : searchLocationInfo.address_name ? (
          <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 font-[Paperlogy]">
            <h3 className="text-lg font-semibold text-gray-900">
              {searchLocationInfo.place_name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {searchLocationInfo.address_name}
            </p>
            <p className="text-sm text-gray-500">
              {searchLocationInfo.road_address_name}
            </p>
            <button
              onClick={handleAddMarkerClick}
              className="cursor-pointer text-[var(--logo-green)] hover:text-[var(--light-green)] mt-5"
            >
              이곳에 마커 추가하기
            </button>
          </div>
        ) : (
          <DiaryRegister />
        )}
      </div>
    </div>
  );
}

export default OverlayPanel;
