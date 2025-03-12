import { useEffect, useState } from 'react';
import { useMapStore } from '@/store/Map';

const MARKER_SVG_PATH = '/icons/icon-location-pin-underbar.svg';

interface MarkerProps {
  map: any;
  latitude: number;
  longitude: number;
  setMarker: (marker: any) => void;
}

export const Marker = ({
  map,
  latitude,
  longitude,
  setMarker,
}: MarkerProps) => {
  const { selectedLocation, setCurrentMarker } = useMapStore();
  const [marker, setLocalMarker] = useState<any>(null);
  const [infowindow, setInfowindow] = useState<any>(null);

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

    setLocalMarker(newMarker);
    setCurrentMarker(newMarker);
    setMarker(newMarker);

    // ✅ 인포윈도우 생성
    const newInfowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    setInfowindow(newInfowindow);

    // ✅ 마커 클릭 시 인포윈도우에 주소 표시
    kakao.maps.event.addListener(newMarker, 'click', () => {
      if (!selectedLocation) return;

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(
        selectedLocation.lon,
        selectedLocation.lat,
        (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;

            const content = `
              <div style="
                padding: 5px;
                font-size: 12px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                background: white;
                border: 1px solid #ccc;
                border-radius: 5px;
              ">
                ${address}
              </div>
            `;

            newInfowindow.setContent(content);
            newInfowindow.open(map, newMarker);
          }
        }
      );
    });

    return () => {
      if (newMarker) newMarker.setMap(null);
      if (newInfowindow) newInfowindow.close();
    };
  }, [map, selectedLocation]);

  return null;
};
