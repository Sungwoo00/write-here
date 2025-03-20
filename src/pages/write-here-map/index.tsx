import MapContainer from '@/components/level-2/MapContainer';
import LocationInfo from '@/components/level-1/LocationInfo';
import DiaryRegister from '@/components/level-3/DiaryRegister';
import MarkerSelector from '@/components/level-3/AddPinButton';
import { useMapStore } from '@/store/Map';

function WriteHereMap() {
  // Zustand에서 색상과 마커 상태 가져오기
  useMapStore(); // Ensure the store is still initialized if needed

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-10 relative">
      {/* 지도 렌더링 */}
      <MapContainer />

      {/* 클릭한 위치 정보 & 현재 주소 표시 */}
      <LocationInfo />
      <DiaryRegister />

      {/* 마커 및 색상 선택 UI */}
      <MarkerSelector />
    </div>
  );
}

export default WriteHereMap;
