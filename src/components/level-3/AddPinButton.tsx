import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { useMapStore } from '@/store/Map';

const COLOR_MAP = {
  black: '#000000',
  blue: '#24a9ff',
  red: '#ff5757',
  yellow: '#ffa51d',
  green: '#3ba23f',
};

const MARKER_TYPES = ['pin-1', 'pin-2', 'pin-3', 'pin-4', 'pin-5'];
const BASE_PATH = '/icons/pins/';

const DEFAULT_MARKER = 'pin-1';
const DEFAULT_COLOR: keyof typeof COLOR_MAP = 'black';

export default function MarkerSelector() {
  const { setTempMarkerPath } = useMapStore();

  const [selectedMarker, setSelectedMarker] = useState<string>(DEFAULT_MARKER);
  const [selectedColor, setSelectedColor] =
    useState<keyof typeof COLOR_MAP>(DEFAULT_COLOR);

  const [isOpen, setIsOpen] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

  // ✅ 마커 선택 핸들러 (한 번 클릭하면 바로 적용)
  const handleMarkerSelect = (markerType: string) => {
    setSelectedMarker(markerType);
    setTempMarkerPath(`${BASE_PATH}${markerType}-${selectedColor}.svg`); // ✅ markerType을 직접 사용
  };

  // ✅ 색상 선택 핸들러
  const handleColorSelect = (color: keyof typeof COLOR_MAP) => {
    setSelectedColor(color);
    setTempMarkerPath(`${BASE_PATH}${selectedMarker}-${color}.svg`); // ✅ selectedColor가 업데이트되기 전에 color를 직접 사용
  };

  // ✅ 미리보기 이미지 경로
  const previewMarkerPath = `${BASE_PATH}${selectedMarker}-${selectedColor}.svg`;

  return (
    <div className="fixed bottom-10 right-10 flex items-center z-[1000]">
      {/* 미리보기 */}
      <div className="flex items-center space-x-2">
        <img src={previewMarkerPath} className="w-10 h-10" alt="선택된 마커" />
      </div>

      {/* 플로팅 버튼 */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 360 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-14 h-14 bg-green-600 text-white flex items-center justify-center rounded-full shadow-lg z-[1000]"
      >
        {isOpen ? <X size={30} /> : <Plus size={30} />}
      </motion.button>

      {/* 마커 선택 창 */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-[60px] right-0 bg-white p-1 rounded-full shadow-lg flex flex-col items-center space-y-2"
        >
          {/* 색상 미리보기 버튼 */}
          <button
            type="button"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: COLOR_MAP[selectedColor] }}
            onClick={() => setIsColorPaletteOpen(!isColorPaletteOpen)}
          ></button>

          {/* 색상 선택 팔레트 */}
          {isColorPaletteOpen && (
            <div className="absolute right-[120%] top-0 bg-white p-2 rounded-xl shadow-lg flex flex-col items-center space-y-2">
              {Object.entries(COLOR_MAP).map(([colorName, colorCode]) => (
                <button
                  key={colorName}
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: colorCode }}
                  onClick={() =>
                    handleColorSelect(colorName as keyof typeof COLOR_MAP)
                  }
                ></button>
              ))}
            </div>
          )}

          {/* 마커 선택 리스트 */}
          <div className="flex flex-col items-center space-y-2">
            {MARKER_TYPES.map((marker) => (
              <button
                key={marker}
                type="button"
                className={`w-12 h-12 flex items-center justify-center ${
                  selectedMarker === marker
                    ? 'border-2 border-blue-500 rounded-full'
                    : ''
                }`}
                onClick={() => handleMarkerSelect(marker)}
              >
                <img
                  src={`${BASE_PATH}${marker}-${selectedColor}.svg`}
                  className="w-8 h-8"
                  alt={marker}
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
