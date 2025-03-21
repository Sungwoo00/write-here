import MapContainer from '@/components/level-2/MapContainer';
import DiaryRegister from '@/components/level-3/DiaryRegister';
import MarkerSelector from '@/components/level-3/AddPinButton';
import { useMapStore } from '@/store/Map';

function WriteHereMap() {
  const { setAddMarkerMode } = useMapStore();
  return (
    <div className="flex flex-col items-center justify-center h-scree mt-10 relative">
      <MapContainer />
      {/*  모드 온오프 버튼은 임시임 */}
      <button
        className="absolute top-10 border-2 z-50"
        onClick={() => setAddMarkerMode(true)}
      >
        마커찍기 모드
      </button>
      <button
        className="absolute top-20 border-2 z-50"
        onClick={() => setAddMarkerMode(false)}
      >
        모드 해제
      </button>
      <DiaryRegister />

      {/* 마커 및 색상 선택 UI */}
      <MarkerSelector />
    </div>
  );
}

export default WriteHereMap;
