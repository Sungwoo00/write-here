import MapContainer from '@/components/level-2/MapContainer';
import DiaryRegister from '@/components/level-3/DiaryRegister';
import MarkerSelector from '@/components/level-3/AddPinButton';
import { useMapStore } from '@/store/Map';

function WriteHereMap() {
  const { setAddMarkerMode } = useMapStore();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* 지도 컨테이너 */}
      <div className="relative w-full flex-1">
        <MapContainer />

        {/* 마커 선택 UI - 지도 컨테이너 내부 오른쪽 하단 배치 */}
        <div className="absolute bottom-5 right-5 z-[100]">
          <MarkerSelector />
        </div>

        {/* 모드 온오프 버튼 */}
        <button
          className="absolute top-10 left-5 border-2 z-50 bg-white px-4 py-2 rounded"
          onClick={() => setAddMarkerMode(true)}
        >
          마커찍기 모드
        </button>
        <button
          className="absolute top-20 left-5 border-2 z-50 bg-white px-4 py-2 rounded"
          onClick={() => setAddMarkerMode(false)}
        >
          모드 해제
        </button>
      </div>

      {/* 다이어리 등록 컴포넌트 */}
      <DiaryRegister />
    </div>
  );
}

export default WriteHereMap;
