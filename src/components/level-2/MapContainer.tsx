import { useEffect, useRef, useState } from 'react';
import DrawMarker from '@/components/level-2/DrawMarker';
import { useMapStore } from '@/store/Map';
import useTableStore from '@/store/DiaryData';
import Modal from '@/components/level-2/Modal';
import MarkerSelector from '@/components/level-3/MarkerSelector';
import MapSearch from '@/pages/write-here-map/MapSearch';

const LocationIcon = '/icons/icon-gps.svg';

function MapContainer() {
  const {
    tempMarker,
    setTempMarkerLocation,
    setTempMarkerRegion,
    setInitialPlace,
    currentLat,
    currentLon,
    setCurrentLocation,
    addMarkerMode,
    setAddMarkerMode,
  } = useMapStore();
  const { markers } = useTableStore();
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById('map');
      if (!container) return;
      const options = {
        center: new kakao.maps.LatLng(currentLat, currentLon),
        level: 5,
      };
      mapRef.current = new kakao.maps.Map(container, options);
      setMapLoaded(true);
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
    return () => {
      if (mapRef.current) {
        const latlng = mapRef.current.getCenter();
        setCurrentLocation(latlng.getLat(), latlng.getLng());
      }
    };
  }, [currentLat, currentLon, setCurrentLocation]);

  useEffect(() => {
    const handleAddMarker = (mouseEvent: kakao.maps.event.MouseEvent) => {
      const latlng = mouseEvent.latLng;
      const lon = latlng.getLng();
      const lat = latlng.getLat();
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
            setInitialPlace(address_name);
            setTempMarkerRegion(region_1depth_name);
            setTempMarkerLocation(lat, lon);
          } else {
            setModalMsg('마커는 국내 육지에만 생성 가능합니다');
            setIsModalOpen(true);
          }
        }
      );
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
    setCurrentLocation,
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

  const handleModalButtonClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen relative">
      <div id="map" className="w-full h-full"></div>
      {mapLoaded && mapRef.current && (
        <>
          <button
            onClick={goToCurrentLocation}
            className="absolute bottom-5 left-5 bg-white border-none cursor-pointer 
          w-10 h-10 rounded-full flex items-center justify-center z-10 
          shadow-md"
          >
            <img
              src={LocationIcon}
              alt="현재 위치 아이콘"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
          <MarkerSelector />
          {addMarkerMode && (
            <DrawMarker map={mapRef.current} marker={tempMarker} />
          )}
          {markers.map((marker) => (
            <DrawMarker
              key={marker.marker_id}
              map={mapRef.current}
              marker={marker}
            />
          ))}
          <MapSearch map={mapRef.current} />
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        buttonConfirmText="확인"
        buttonCancelText="닫기"
        onConfirm={handleModalButtonClick}
        onClose={handleModalButtonClick}
      >
        <p className="min-h-15 mt-2 text-[var(--dark-gray)] text-center">
          {modalMsg}
        </p>
      </Modal>
    </div>
  );
}

export default MapContainer;
