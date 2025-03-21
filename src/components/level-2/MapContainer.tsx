import { useEffect, useRef } from 'react';
import { Marker } from '@/components/level-2/Marker';
import { useMapStore } from '@/store/Map';

const LocationIcon = '/icons/icon-gps.svg';

function MapContainer() {
  const {
    setTempMarkerLocation,
    setTempMarkerRegion,
    setInitialPlace,
    currentLat,
    currentLon,
    setCurrentLocation,
    addMarkerMode,
    setAddMarkerMode,
  } = useMapStore();

  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById('map');
      if (!container) return;
      const options = {
        center: new kakao.maps.LatLng(currentLat, currentLon),
        level: 5,
      };
      mapRef.current = new kakao.maps.Map(container, options);
    };

    if (!window.kakao) {
      const apiKey = import.meta.env.VITE_KAKAO_API_KEY;
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        window.kakao.maps.load(initMap);
      };
    } else {
      window.kakao.maps.load(initMap);
    }
  }, [currentLat, currentLon, setCurrentLocation]);
  useEffect(() => {
    const handleAddMarker = (mouseEvent: kakao.maps.event.MouseEvent) => {
      const latlng = mouseEvent.latLng;
      const lat = latlng.getLat();
      const lon = latlng.getLng();
      //콘솔로그 지울예정
      console.log(lat, lon);
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(
        lon,
        lat,
        (
          result: {
            address: kakao.maps.services.Address;
          }[],
          status: kakao.maps.services.Status
        ) => {
          if (status === kakao.maps.services.Status.OK) {
            const { address_name, region_1depth_name } = result[0].address;
            //콘솔로그 지울예정
            console.log(region_1depth_name);
            setInitialPlace(address_name);
            setTempMarkerRegion(region_1depth_name);
          }
        }
      );
      setTempMarkerLocation(lat, lon);
      //마커 찍히고 레지스터 페이지 올라오게 만들어야함
    };
    if (mapRef.current && addMarkerMode) {
      kakao.maps.event.addListener(mapRef.current, 'click', handleAddMarker);
    }

    return () => {
      if (mapRef.current) {
        kakao.maps.event.removeListener(
          mapRef.current,
          'click',
          handleAddMarker
        );
      }
    };
  }, [
    addMarkerMode,
    setAddMarkerMode,
    setInitialPlace,
    setTempMarkerLocation,
    setTempMarkerRegion,
  ]);

  const goToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        if (mapRef.current) {
          const kakao = window.kakao;
          const locPosition = new kakao.maps.LatLng(lat, lon);
          mapRef.current.setCenter(locPosition);
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
        {mapRef.current && addMarkerMode && <Marker map={mapRef.current} />}
      </div>
    </div>
  );
}

export default MapContainer;
