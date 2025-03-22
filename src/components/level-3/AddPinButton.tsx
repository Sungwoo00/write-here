import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useMapStore } from '@/store/Map';

const COLOR_MAP = {
  black: '#000000',
  blue: '#24a9ff',
  yellow: '#ffa51d',
  green: '#3ba23f',
  red: '#ff4d4f',
};

const MARKER_TYPES = ['pin-1', 'pin-2', 'pin-3', 'pin-4', 'pin-5'];
const BASE_PATH = '/icons/pins/';

const DEFAULT_MARKER = 'pin-1';
const DEFAULT_COLOR: keyof typeof COLOR_MAP = 'black';

const LOGO_GREEN = '#0A8423';

export default function MarkerSelector() {
  const { addMarkerMode, setAddMarkerMode, setTempMarkerPath, initTempMarker } =
    useMapStore();

  const [selectedMarker, setSelectedMarker] = useState<string>(DEFAULT_MARKER);
  const [selectedColor, setSelectedColor] =
    useState<keyof typeof COLOR_MAP>(DEFAULT_COLOR);
  const [savedPath] = useState<string>(
    `${BASE_PATH}${DEFAULT_MARKER}-${DEFAULT_COLOR}.svg`
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

  // 플러스 버튼 클릭 → 마커 모드 & 마커 선택창
  const handleToggle = () => {
    if (!addMarkerMode) {
      setTempMarkerPath(savedPath);
      console.log(' Restoring saved path:', savedPath);
    } else {
      initTempMarker();
      console.log(' Marker reset:', useMapStore.getState().tempMarker);
    }
    setAddMarkerMode(!addMarkerMode);
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute bottom-5 right-5 flex flex-col items-center z-[100]">
      {/* 마커 선택 창 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="marker-selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute bottom-14 bg-white w-14 h-[282px] rounded-full shadow-lg flex flex-col items-center py-3 space-y-2"
          >
            {/* 색상 미리보기 버튼 */}
            <button
              type="button"
              className="w-8 h-8 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: COLOR_MAP[selectedColor] }}
              onClick={() => setIsColorPaletteOpen(!isColorPaletteOpen)}
            ></button>

            {/* 색상 선택 팔레트 */}
            {isColorPaletteOpen && (
              <div className="absolute right-[90%] top-0 bg-white p-1 rounded-xl shadow-lg flex flex-col items-center">
                {Object.entries(COLOR_MAP).map(([colorName, colorCode]) => (
                  <button
                    key={colorName}
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: colorCode }}
                    onClick={() =>
                      setSelectedColor(colorName as keyof typeof COLOR_MAP)
                    }
                  ></button>
                ))}
              </div>
            )}

            {/* 마커 선택 리스트 */}
            <div className="flex flex-col items-center gap-0">
              {MARKER_TYPES.map((marker) => (
                <button
                  key={marker}
                  type="button"
                  className={`w-9 h-9 flex items-center justify-center ${
                    selectedMarker === marker
                      ? 'border-2 border-blue-500 rounded-full'
                      : ''
                  }`}
                  onClick={() => setSelectedMarker(marker)}
                >
                  <img
                    src={`${BASE_PATH}${marker}-${selectedColor}.svg`}
                    className="w-5 h-5"
                    alt={marker}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 플러스 버튼 (마커 모드 & 마커 선택창 토글) */}
      <motion.button
        type="button"
        onClick={handleToggle}
        animate={{ rotate: addMarkerMode ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-13 h-13 flex items-center justify-center rounded-full shadow-lg text-white"
        style={{ backgroundColor: LOGO_GREEN }}
      >
        <Plus size={32} />
      </motion.button>
    </div>
  );
}
