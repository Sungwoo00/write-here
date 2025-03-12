import { useMapStore } from '@/store/Map';

function LocationInfo() {
  const { selectedLocation, selectedRegion, map, initialLocation } =
    useMapStore();

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
        📌 지도 정보
      </h3>

      {/* ✅ 현재 위치 표시 */}
      {initialLocation ? (
        <p>
          📍 현재 위치: 위도 {initialLocation.lat}, 경도 {initialLocation.lon}
        </p>
      ) : (
        <p>📍 현재 위치 정보 없음</p>
      )}

      {/* ✅ 선택한 위치 표시 */}
      {selectedLocation ? (
        <p>
          📍 선택한 위치: 위도 {selectedLocation.lat}, 경도{' '}
          {selectedLocation.lon}
        </p>
      ) : (
        <p>📍 선택된 위치가 없습니다.</p>
      )}

      {/* ✅ 선택한 '도' 정보 표시 */}
      {selectedRegion && <p>🗺️ 선택한 지역: {selectedRegion}</p>}

      {/* ✅ Kakao Map 저장 상태 표시 */}
      <p>
        🗺️ Kakao Map 상태:{' '}
        {map ? (
          <span style={{ color: 'green' }}>✅ 저장됨</span>
        ) : (
          <span style={{ color: 'red' }}>❌ 없음</span>
        )}
      </p>
    </div>
  );
}

export default LocationInfo;
