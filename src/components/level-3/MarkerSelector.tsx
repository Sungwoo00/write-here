import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
const DEFAULT_COLOR: keyof typeof COLOR_MAP = 'black';

export default function MarkerSelector() {
  const { addMarkerMode, setAddMarkerMode, setTempMarkerPath, initTempMarker } =
    useMapStore();

  const [selectedMarker, setSelectedMarker] = useState<string>(MARKER_TYPES[0]);
  const [selectedColor, setSelectedColor] =
    useState<keyof typeof COLOR_MAP>(DEFAULT_COLOR);

  const [isOpen, setIsOpen] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      setAddMarkerMode(true);
      setTempMarkerPath(`${BASE_PATH}${selectedMarker}-${selectedColor}.svg`);
    } else {
      initTempMarker();
      setAddMarkerMode(false);
    }
    setAddMarkerMode(!addMarkerMode);
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    return () => {
      setAddMarkerMode(false);
      initTempMarker();
    };
  }, [initTempMarker, setAddMarkerMode]);

  useEffect(() => {
    setTempMarkerPath(`${BASE_PATH}${selectedMarker}-${selectedColor}.svg`);
  }, [selectedMarker, selectedColor, setTempMarkerPath, setAddMarkerMode]);

  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-center z-[1000]">
      {/* 마커 선택 창 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="marker-selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onAnimationComplete={() => {
              if (!isOpen) {
                console.log('Marker selector closed');
              }
            }}
            className="absolute bottom-0 bg-white w-14 h-[282px] rounded-full shadow-lg flex flex-col items-center py-3 space-y-2"
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
      <motion.button
        type="button"
        onClick={handleToggle}
        animate={{ rotate: addMarkerMode ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-13 h-13 flex items-center justify-center rounded-full shadow-lg text-white absolute bottom-[-15px]"
        style={{ backgroundColor: '#0A8423', bottom: '0px' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M5 12H19"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </div>
  );
}
