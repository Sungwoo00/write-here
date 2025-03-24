import { useEffect } from 'react';
import { Marker } from '@/store/DiaryData';
import { SearchLocationInfo, useMapStore } from '@/store/Map';

interface RenderMarkerProps {
  map: kakao.maps.Map | null;
  marker: Marker;
  searchLocationInfo?: SearchLocationInfo;
}

function DrawMarker({ map, marker, searchLocationInfo }: RenderMarkerProps) {
  const {
    isOverlayOpen,
    openOverlay,
    setSearchLocationInfo,
    setTempMarkerLocation,
  } = useMapStore();
  useEffect(() => {
    if (!map) return;
    const { lat, lon, marker_path, marker_id } = marker;
    if (!(lat + lon)) return;
    const kakao = window.kakao;
    const position = new kakao.maps.LatLng(lat, lon);
    const imageSize = new kakao.maps.Size(40, 40);
    const markerImage = new kakao.maps.MarkerImage(marker_path, imageSize);
    const newMarker = new kakao.maps.Marker({
      position,
      image: markerImage,
      map,
    });
    const handleMarkerClick = () => {
      if (searchLocationInfo) {
        setSearchLocationInfo(searchLocationInfo);
        setTempMarkerLocation(lat, lon);
      }
      if (!isOverlayOpen) {
        map.setCenter(position);
        map.panBy(0, 300);
        openOverlay(marker_id);
      } else {
        openOverlay(marker_id);
      }
    };

    kakao.maps.event.addListener(newMarker, 'click', handleMarkerClick);
    return () => {
      newMarker.setMap(null);
    };
  }, [
    isOverlayOpen,
    openOverlay,
    map,
    marker,
    searchLocationInfo,
    setSearchLocationInfo,
    setTempMarkerLocation,
  ]);

  return null;
}

export default DrawMarker;
