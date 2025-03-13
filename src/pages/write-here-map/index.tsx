import MapContainer from '@/components/level-2/MapContainer';
import LocationInfo from '@/components/level-1/LocationInfo';
import DiaryRegister from '@/components/level-3/DiaryRegister';

function WriteHereMap() {
  return (
    <div className="flex flex-col items-center justify-center h-scree mt-10">
      {/*  지도 렌더링 */}
      <MapContainer />

      {/*  클릭한 위치 정보 & 현재 주소 표시 */}
      <LocationInfo />
      <DiaryRegister />
    </div>
  );
}

export default WriteHereMap;
