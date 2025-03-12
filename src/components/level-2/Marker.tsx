import { useEffect, useState } from 'react';

// ✅ 마커 아이콘
const MARKER_SVG_PATH = '/icons/icon-location-pin-underbar.svg';

interface MarkerProps {
  map: any;
  latitude: number;
  longitude: number;
  setAddress?: (address: string) => void; // ✅ 선택적 사용으로 변경
  setMarker: (marker: any) => void;
}

export const Marker = ({
  map,
  latitude,
  longitude,
  setAddress,
  setMarker,
}: MarkerProps) => {
  const [marker, updateMarker] = useState<any>(null);

  useEffect(() => {
    if (!map) return;

    const kakao = (window as any).kakao; // ✅ `kakao` 객체 선언 추가
    const position = new kakao.maps.LatLng(latitude, longitude);
    const imageSize = new kakao.maps.Size(40, 40);
    const markerImage = new kakao.maps.MarkerImage(MARKER_SVG_PATH, imageSize);

    const newMarker = new kakao.maps.Marker({
      position,
      image: markerImage,
      map,
    });

    updateMarker(newMarker);
    setMarker(newMarker); // ✅ 부모 컴포넌트에 마커 전달

    if (setAddress) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(
        longitude,
        latitude,
        (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            setAddress(result[0].address.address_name);
          }
        }
      );
    }

    return () => newMarker.setMap(null); // ✅ 언마운트 시 마커 제거
  }, [map]);

  // ✅ 마커 위치가 변경되면 위치 업데이트
  useEffect(() => {
    if (marker) {
      const kakao = (window as any).kakao; // ✅ `kakao` 객체 선언 추가
      const newPosition = new kakao.maps.LatLng(latitude, longitude);
      marker.setPosition(newPosition);
    }
  }, [latitude, longitude]);

  return null;
};
