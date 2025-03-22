import MapContainer from '@/components/level-2/MapContainer';
import DiaryRegister from '@/components/level-3/DiaryRegister';
import MarkerSelector from '@/components/level-3/MarkerSelector';

function WriteHereMap() {
  return (
    <div className="flex flex-col items-center justify-center h-scree mt-10 relative">
      <MapContainer />
      <DiaryRegister />
      <MarkerSelector />
    </div>
  );
}

export default WriteHereMap;
