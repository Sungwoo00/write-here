import MapContainer from '@/components/level-2/MapContainer';
import DiaryRegister from '@/components/level-3/DiaryRegister';
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
    </div>
  );
}

export default WriteHereMap;
