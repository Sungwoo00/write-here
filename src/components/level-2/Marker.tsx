import { useMapStore } from '@/store/Map';
import { useEffect } from 'react';

interface MarkerProps {
  map: kakao.maps.Map | kakao.maps.Roadview | undefined;
}

export const Marker = ({ map }: MarkerProps) => {
  const { tempMarker } = useMapStore();
  useEffect(() => {
    if (!map) return;
    const { lat, lon, marker_path } = tempMarker;
    const kakao = window.kakao;
    const position = new kakao.maps.LatLng(lat, lon);
    const imageSize = new kakao.maps.Size(40, 40);
    const markerImage = new kakao.maps.MarkerImage(marker_path, imageSize);

    const newMarker = new kakao.maps.Marker({
      position,
      image: markerImage,
      map,
    });

    return () => {
      newMarker.setMap(null);
    };
  }, [map, tempMarker]);

  return null;
};
