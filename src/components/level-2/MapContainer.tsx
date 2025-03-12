import { useEffect, useState } from 'react';
import { Marker } from '@/components/level-2/Marker';
import { useMapStore } from '@/store/Map';

const LocationIcon = '/icons/icon-gps.svg';

function MapContainer() {
  const {
    map,
    setMap,
    setSelectedLocation,
    setSelectedRegion,
    addRecord,
    cacheRegion,
    getCachedRegion,
    initialLocation,
    setInitialLocation,
    currentLat,
    currentLon,
    setCurrentLocation,
    currentMarker,
    setCurrentMarker,
  } = useMapStore();

  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    const apiKey = import.meta.env.VITE_KAKAO_API_KEY;
    if (!apiKey) return;

    if (!map) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        const kakao = (window as any).kakao;
        kakao.maps.load(() => {
          const container = document.getElementById('map');
          if (!container) return;

          const options = {
            center: new kakao.maps.LatLng(currentLat, currentLon),
            level: 9,
          };

          const newMap = new kakao.maps.Map(container, options);
          setMap(newMap);

          const geocoder = new kakao.maps.services.Geocoder();

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

          kakao.maps.event.addListener(newMap, 'click', (mouseEvent: any) => {
            const latlng = mouseEvent.latLng;
            const lat = latlng.getLat();
            const lon = latlng.getLng();

            setSelectedLocation(lat, lon);
            setCurrentLocation(lat, lon);

            if (currentMarker) {
              currentMarker.setPosition(latlng);
            }

            const cachedRegion = getCachedRegion(lat, lon);
            if (cachedRegion) {
              setSelectedRegion(cachedRegion);
              addRecord(cachedRegion);
              return;
            }

            geocoder.coord2RegionCode(lon, lat, (result: any, status: any) => {
              if (status === kakao.maps.services.Status.OK) {
                const region = result.find(
                  (r: any) => r.region_type === 'H'
                )?.address_name;
                if (region) {
                  setSelectedRegion(region);
                  addRecord(region);
                  cacheRegion(lat, lon, region);
                }
              }
            });
          });
        });
      };

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [map, setMap, setSelectedLocation, setSelectedRegion]);

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
        width: '100%',
        maxWidth: '1200px',
        padding: '0 16px',
      }}
    >
      {/* ✅ 지도 컨테이너 (반응형 적용) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '600px', // ✅ 높이 조정
          maxWidth: '1200px', // ✅ 가로폭 확장
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

        {/* ✅ 현재 위치 버튼 (왼쪽 하단) */}
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

        {/* ✅ 마커 */}
        {map && (
          <Marker
            map={map}
            latitude={currentLat}
            longitude={currentLon}
            setMarker={setCurrentMarker}
          />
        )}
      </div>

      {/* ✅ 현재 주소 표시 (지도 아래) */}
      <div
        style={{
          marginTop: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
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
}

export default MapContainer;
