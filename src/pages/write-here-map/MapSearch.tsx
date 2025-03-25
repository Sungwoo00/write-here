import DrawMarker from '@/components/level-2/DrawMarker';
import Modal from '@/components/level-2/Modal';
import { useMapStore } from '@/store/Map';
import { useEffect, useState } from 'react';

interface MapSearchProps {
  map: kakao.maps.Map | null;
}

function MapSearch({ map }: MapSearchProps) {
  const { mapSearchKeyword, initSearch } = useMapStore();
  const [isSearchComplete, setIsSearchComplete] = useState<boolean>(false);
  const [searchResult, setSearchResult] =
    useState<kakao.maps.services.PlacesSearchResult>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  useEffect(() => {
    if (!mapSearchKeyword) {
      setIsSearchComplete(false);
      return;
    }
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    const bounds = new kakao.maps.LatLngBounds();
    ps.keywordSearch(mapSearchKeyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        result.map(({ x, y }) =>
          bounds.extend(new kakao.maps.LatLng(Number(y), Number(x)))
        );
        setSearchResult(result);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setModalMsg('검색 결과가 존재하지 않습니다.');
        setIsModalOpen(true);
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        setModalMsg('검색중 오류가 발생했습니다.');
        setIsModalOpen(true);
        return;
      }

      setIsSearchComplete(true);
      map.setBounds(bounds);
    });
  }, [map, mapSearchKeyword]);

  const handleModalButtonClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isSearchComplete && (
        <>
          <button
            className="absolute p-1 top-5 z-50 font-[Paperlogy] text-white bg-[var(--logo-green)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-80"
            onClick={() => {
              initSearch();
              setIsSearchComplete(false);
            }}
          >
            검색 초기화
          </button>
          {searchResult.map(
            ({ id, address_name, place_name, road_address_name, x, y }) => (
              <DrawMarker
                key={id}
                map={map}
                marker={{
                  lat: Number(y),
                  lon: Number(x),
                  marker_path: '/icons/pins/pin-1-red.svg',
                }}
                searchLocationInfo={{
                  address_name,
                  place_name,
                  road_address_name,
                }}
              />
            )
          )}
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
    </>
  );
}

export default MapSearch;
