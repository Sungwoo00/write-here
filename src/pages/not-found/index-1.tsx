import React from 'react';
import NavigationBar from '@/components/level-1/NavigationBar';
import MapContainer from '@/components/level-2/MapContainer'; // ✅ Map → MapContainer로 변경

function MapPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <NavigationBar />
      <p className="text-2xl font-black mt-10">내 위치 지도</p>
      <div className="mt-10">
        <MapContainer />
      </div>
    </div>
  );
}

export default MapPage;
