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
  const [marker, updateMarker] = useState<any>(null);
  const [infowindow, setInfowindow] = useState<any>(null); // ✅ 인포윈도우 상태 추가

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

    updateMarker(newMarker);
    setMarker(newMarker); // 부모 컴포넌트에 마커 전달

    // 인포윈도우 생성
    const newInfowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    setInfowindow(newInfowindow);

    return () => {
      newMarker.setMap(null);
      newInfowindow.close();
    };
  }, [map]);

  // 마커 이동 시 인포윈도우 업데이트
  useEffect(() => {
    if (marker && infowindow) {
      const kakao = (window as any).kakao;
      const newPosition = new kakao.maps.LatLng(latitude, longitude);
      marker.setPosition(newPosition);

      // 클릭한 위치의 주소 변환하여 마커 위에 한 줄로 표시
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(
        longitude,
        latitude,
        (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;

            // 한 줄로 표시하는 스타일 적용
            const content = `
            <div style="
              padding: 5px;
              font-size: 12px;
              max-width: 200px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: center;
            ">
              ${address}
            </div>
          `;

            infowindow.setContent(content);
            infowindow.open(map, marker);
          }
        }
      );
    }
  }, [latitude, longitude]);

  return null;
};
