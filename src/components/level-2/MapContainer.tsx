import { useEffect, useState } from 'react';
import { Marker } from '@/components/level-2/Marker';
import { useMapStore } from '@/store/Map';

// 현재 위치 아이콘 (public 폴더 사용)
const LocationIcon = '/icons/icon-gps.svg';

const MapContainer = () => {
  const {
    initialLocation,
    setInitialLocation,
    currentLat,
    currentLon,
    setCurrentLocation,
    currentMarker,
    setCurrentMarker,
  } = useMapStore();
  const [map, setMap] = useState<any>(null);
  const [currentAddress, setCurrentAddress] = useState(''); // 현재 위치 주소 상태 추가

  useEffect(() => {
    const apiKey = import.meta.env.VITE_KAKAO_API_KEY;
    if (!apiKey) {
      console.error(' 카카오 API 키가 없습니다.');
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      if (!(window as any).kakao || !(window as any).kakao.maps) {
        console.error(' Kakao Maps API가 로드되지 않았습니다.');
        return;
      }

      const kakao = (window as any).kakao;

      // Kakao Maps API가 완전히 로드된 후 실행/ 지도 생성성
      kakao.maps.load(() => {
        console.log(' Kakao Maps API가 정상적으로 로드되었습니다!');

        const container = document.getElementById('map');
        if (!container) {
          console.error(' 지도를 표시할 #map 요소가 없습니다.');
          return;
        }

        const options = {
          center: new kakao.maps.LatLng(currentLat, currentLon),
          level: 3,
        };

        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);

        // 최초 위치 저장 (한 번만 실행)
        if (!initialLocation) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              setInitialLocation(lat, lon);
              setCurrentLocation(lat, lon);
            });
          }
        }

        // 지도 클릭 시 마커 이동
        kakao.maps.event.addListener(newMap, 'click', (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;
          setCurrentLocation(latlng.getLat(), latlng.getLng());

          if (currentMarker) {
            currentMarker.setPosition(latlng);
          }
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  //현재 위치 버튼 클릭 시 초기 위치로 이동하며 현재 주소 업데이트
  const goToInitialLocation = () => {
    if (initialLocation && map) {
      const kakao = (window as any).kakao;
      const locPosition = new kakao.maps.LatLng(
        initialLocation.lat,
        initialLocation.lon
      );

      setCurrentLocation(initialLocation.lat, initialLocation.lon);
      map.setCenter(locPosition);

      if (currentMarker) {
        currentMarker.setPosition(locPosition);
      }

      // 현재 위치의 주소 변환 후 지도 하단에 표시
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(
        initialLocation.lon,
        initialLocation.lat,
        (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;
            setCurrentAddress(address);
          }
        }
      );
    } else {
      alert(' 초기 위치 정보가 없습니다.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '0 16px',
      }}
    >
      {/*  지도 컨테이너 (중앙 배치 & 반응형 적용) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          height: '500px',
        }}
      >
        <div
          id="map"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        ></div>

        {/* 현재 위치 버튼 (왼쪽 하단 배치, 반응형 적용) */}
        <button
          onClick={goToInitialLocation}
          style={{
            position: 'absolute',
            bottom: '30px',
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
          <img
            src={LocationIcon}
            alt="현재 위치 아이콘"
            style={{ width: '24px', height: '24px' }}
          />
        </button>

        {/* 마커 컴포넌트 */}
        {map && (
          <Marker
            map={map}
            latitude={currentLat}
            longitude={currentLon}
            setMarker={setCurrentMarker}
          />
        )}
      </div>

      {/* 현재 주소 표시 (지도 하단 & 반응형 적용) */}
      <div
        style={{
          marginTop: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
          justifyContent: 'center',
        }}
      >
        <img
          src={LocationIcon}
          alt="위치 아이콘"
          style={{ width: '18px', height: '18px', marginRight: '5px' }}
        />
        <p>현재 주소: {currentAddress}</p>
      </div>
    </div>
  );
};

export default MapContainer;
