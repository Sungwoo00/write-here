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
    addSavedMarker,
    savedMarkers,
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

          //  최초 로딩 시 현재 위치 가져오기
          if (!initialLocation) {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setInitialLocation(lat, lon);
                setCurrentLocation(lat, lon);
                console.log(` 현재 위치 설정됨: 위도 ${lat}, 경도 ${lon}`);
              });
            }
          }

          //  지도 클릭 시 위치 선택
          kakao.maps.event.addListener(newMap, 'click', (mouseEvent: any) => {
            const latlng = mouseEvent.latLng;
            const lat = latlng.getLat();
            const lon = latlng.getLng();

            setSelectedLocation(lat, lon);
            setCurrentLocation(lat, lon);
            console.log(` 선택한 위치: 위도 ${lat}, 경도 ${lon}`);

            if (currentMarker) {
              currentMarker.setPosition(latlng);
            }

            geocoder.coord2Address(lon, lat, (result: any, status: any) => {
              if (status === kakao.maps.services.Status.OK) {
                const address = result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address.address_name;
                setCurrentAddress(address);
                console.log(` 변환된 주소: ${address}`);
              }
            });
          });
        });
      };

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [map]);

  //  현재 위치 버튼 클릭 시 실행
  const goToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCurrentLocation(lat, lon);
        setInitialLocation(lat, lon);

        console.log(` 현재 위치 업데이트: 위도 ${lat}, 경도 ${lon}`);

        if (map) {
          const kakao = (window as any).kakao;
          const locPosition = new kakao.maps.LatLng(lat, lon);
          map.setCenter(locPosition);
          if (currentMarker) {
            currentMarker.setPosition(locPosition);
          }
        }
      });
    } else {
      alert('현재 위치를 가져올 수 없습니다.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1400px',
        padding: '0 16px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '700px',
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

        {/*  현재 위치 버튼 */}
        <button
          onClick={goToCurrentLocation}
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

        {/*  마커 저장 버튼 */}
        <button
          onClick={() => {
            if (currentAddress) {
              addSavedMarker(currentLat, currentLon, currentAddress);
            }
          }}
          style={{
            marginTop: '10px',
            padding: '8px 12px',
            background: '#4CAF50',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          마커 저장
        </button>

        {/*  선택한 위치 마커 */}
        {map && (
          <Marker map={map} latitude={currentLat} longitude={currentLon} />
        )}

        {/* 저장된 마커들 표시 */}
        {map &&
          savedMarkers.map((marker, index) => (
            <Marker
              key={index}
              map={map}
              latitude={marker.lat}
              longitude={marker.lon}
            />
          ))}
      </div>
    </div>
  );
}

export default MapContainer;
