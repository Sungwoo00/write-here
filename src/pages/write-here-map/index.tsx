import MapContainer from '@/components/level-2/MapContainer';
import OverlayPanel from './OverlayPanel';
import { useState } from 'react';
import Modal from '@/components/level-2/Modal';
import { useMapStore } from '@/store/Map';

function WriteHereMap() {
  const {
    isPageModalOpen,
    setPageModalOpen,
    closeOverlay,
    setAddMarkerMode,
    initTempMarker,
  } = useMapStore();
  const [modalMsg] = useState(
    '작성중인 내용은 저장되지 않습니다. 정말 닫으시겠습니까?'
  );
  const handleModalConfirm = () => {
    closeOverlay();
    setAddMarkerMode(false);
    initTempMarker();
  };

  const handleModalClose = () => {
    setPageModalOpen(false);
  };
  return (
    <div className="flex flex-col items-center justify-center flex-grow overflow-hidden h-100">
      <MapContainer />
      <OverlayPanel />
      <Modal
        isOpen={isPageModalOpen}
        buttonConfirmText="확인"
        buttonCancelText="취소"
        onConfirm={handleModalConfirm}
        onClose={handleModalClose}
      >
        <p className="min-h-15 mt-2 text-[var(--dark-gray)] text-center">
          {modalMsg}
        </p>
      </Modal>
    </div>
  );
}

export default WriteHereMap;
