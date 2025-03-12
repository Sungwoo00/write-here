import { useEffect, useState } from 'react';
import { useMapStore } from '@/store/Map';

function LocationInfo() {
  const { selectedLocation, selectedRegion, map, initialLocation } =
    useMapStore();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  // '도' 정보만 추출하는 함수
  const getProvinceName = (region: string | null) => {
    if (!region) return '선택된 지역 없음';
    return region.split(' ')[0]; // 첫 번째 단어(예: 서울특별시, 경기도) 반환 // 현재 도 정보를 가져 오지못하는 문제 발생(해결중)
  };

  // 좌표를 변환하여 주소 업데이트 (selectedLocation이 변경될 때마다 실행)
  useEffect(() => {
    if (!selectedLocation) {
      setSelectedAddress(null);
      return;
    }

    const kakao = (window as any).kakao;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(
      selectedLocation.lon,
      selectedLocation.lat,
      (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const address = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;
          setSelectedAddress(address);
        }
      }
    );
  }, [selectedLocation]);

  return (
    <div
      style={{
        marginTop: '20px',
        padding: '12px',
        borderRadius: '8px',
        background: '#f8f9fa',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        textAlign: 'center',
      }}
    >
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
        지도 정보
      </h3>

      {/*  현재 위치 표시 */}
      {initialLocation ? (
        <p>
          현재 위치: 위도 {initialLocation.lat}, 경도 {initialLocation.lon}
        </p>
      ) : (
        <p> 현재 위치 정보 없음</p>
      )}

      {/*  선택한 위치 표시 */}
      {selectedLocation ? (
        <p>
          선택한 위치: 위도 {selectedLocation.lat}, 경도 {selectedLocation.lon}
        </p>
      ) : (
        <p> 선택된 위치가 없습니다.</p>
      )}

      {/*  선택한 위치의 변환된 주소 표시 */}
      {selectedAddress ? (
        <p>
          선택한 주소: <strong>{selectedAddress}</strong>
        </p>
      ) : (
        <p> 선택한 주소 정보 없음</p>
      )}

      {/*  선택한 '도' 정보만 표시 */}
      <p>
        선택한 도: <strong>{getProvinceName(selectedRegion)}</strong>
      </p>

      {/*  Kakao Map 저장 상태 표시 */}
      <p>
        Kakao Map 상태:{' '}
        {map ? (
          <span style={{ color: 'green' }}> 저장됨</span>
        ) : (
          <span style={{ color: 'red' }}> 없음</span>
        )}
      </p>
    </div>
  );
}

export default LocationInfo;
