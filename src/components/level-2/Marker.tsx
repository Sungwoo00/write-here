import { useEffect } from 'react';

const MARKER_SVG_PATH = '/icons/icon-location-pin-underbar.svg';

interface MarkerProps {
  map: any;
  latitude: number;
  longitude: number;
}

export const Marker = ({ map, latitude, longitude }: MarkerProps) => {

  //const [marker, setLocalMarker] = useState<any>(null);


  useEffect(() => {
    if (!map) return;

    const kakao = (window as any).kakao;
    const position = new kakao.maps.LatLng(latitude, longitude);
    const imageSize = new kakao.maps.Size(40, 40);
    const markerImage = new kakao.maps.MarkerImage(MARKER_SVG_PATH, imageSize);

    const newMarker = new kakao.maps.Marker({
      position,
      image: markerImage,
      map,
    });


    // setLocalMarker(newMarker);

    return () => {
      newMarker.setMap(null);
    };
  }, [map, latitude, longitude]);

  return null;
};
