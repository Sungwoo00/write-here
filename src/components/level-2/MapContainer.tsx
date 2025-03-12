import { useEffect, useState } from 'react';
import { Marker } from '@/components/level-2/Marker';
import { useMapStore } from '@/store/useMapStore'; // ✅ Zustand import

const loadKakaoMap = (callback: () => void) => {
  if (!(window as any).kakao) {
    console.error('카카오 API 로드 실패!');
    return;
  }
  (window as any).kakao.maps.load(callback);
};

const MapContainer = () => {
  const { initialLocation, setInitialLocation } = useMapStore(); // ✅ Zustand 상태 가져오기
  const [map, setMap] = useState<any>(null);
  const [currentLat, setCurrentLat] = useState(33.450701);
  const [currentLon, setCurrentLon] = useState(126.570667);
  const [address, setAddress] = useState('');
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_KAKAO_API_KEY;
    if (!apiKey) {
      console.error('카카오 API 키가 없습니다.');
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      loadKakaoMap(() => {
        const container = document.getElementById('map');
        if (!container) {
          console.error('지도를 표시할 #map 요소가 없습니다.');
          return;
        }

        const kakao = (window as any).kakao;
        const options = {
          center: new kakao.maps.LatLng(currentLat, currentLon),
          level: 3,
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);

        // ✅ Zustand에 "최초 위치"가 없으면 현재 위치 저장
        if (!initialLocation) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              setInitialLocation(lat, lon); // ✅ Zustand에 저장
              setCurrentLat(lat);
              setCurrentLon(lon);
            });
          }
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // ✅ 현재 위치 버튼을 눌렀을 때, Zustand의 "최초 위치"로 이동
  const goToInitialLocation = () => {
    if (initialLocation && map) {
      const kakao = (window as any).kakao;
      const locPosition = new kakao.maps.LatLng(
        initialLocation.lat,
        initialLocation.lon
      );

      setCurrentLat(initialLocation.lat);
      setCurrentLon(initialLocation.lon);

      map.setCenter(locPosition);

      if (marker) {
        marker.setPosition(locPosition); // ✅ 마커 위치 이동
      }
    } else {
      alert('📍 초기 위치 정보가 없습니다.');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '600px', height: '500px' }}></div>

      {/* ✅ 현재 위치 버튼 (최초 위치로 이동) */}
      <button
        onClick={goToInitialLocation}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'white',
          border: 'none',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        📍
      </button>

      {/* ✅ 마커 컴포넌트 */}
      {map && (
        <Marker
          map={map}
          latitude={currentLat}
          longitude={currentLon}
          setAddress={setAddress}
          setMarker={setMarker}
        />
      )}

      <p>현재 주소: {address}</p>
    </div>
  );
};

export default MapContainer;
