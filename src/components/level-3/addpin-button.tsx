import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';

// SVG 마커 아이콘 가져오기
import Marker1 from '@/../public/icons/icon-location-pin.svg';
import Marker2 from '@/../public/icons/icon-footprint.svg';
import Marker3 from '@/../public/icons/icon-pin.svg';
import Marker4 from '@/../public/icons/icon-anchor.svg';
import Marker5 from '@/../public/icons/icon-map.svg';

// 사용할 마커 아이콘 배열
const MARKER_ICONS = [
  {
    name: 'location-pin',
    component: (props: React.SVGProps<SVGSVGElement>) => <Marker1 {...props} />,
  },
  {
    name: 'footprint',
    component: (props: React.SVGProps<SVGSVGElement>) => <Marker2 {...props} />,
  },
  {
    name: 'pin',
    component: (props: React.SVGProps<SVGSVGElement>) => <Marker3 {...props} />,
  },
  {
    name: 'anchor',
    component: (props: React.SVGProps<SVGSVGElement>) => <Marker4 {...props} />,
  },
  {
    name: 'map',
    component: (props: React.SVGProps<SVGSVGElement>) => <Marker5 {...props} />,
  },
];

interface MarkerSelectorProps {
  onSelect: (color: string, marker: string) => void;
}

export default function MarkerSelector({ onSelect }: MarkerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false); // 전체 메뉴 상태
  const [selectedColor, setSelectedColor] = useState('#3535AE'); // 기본 색상
  const [selectedMarker, setSelectedMarker] = useState(MARKER_ICONS[0]); // 선택한 마커

  // 색상 변경 핸들러
  const handleColorChange = (color: { hex: string }) => {
    setSelectedColor(color.hex);
    onSelect(color.hex, selectedMarker.name);
  };

  // 마커 변경 핸들러
  const handleMarkerSelect = (marker: (typeof MARKER_ICONS)[number]) => {
    setSelectedMarker(marker);
    onSelect(selectedColor, marker.name);
  };

  return (
    <div className="fixed bottom-10 left-10 flex flex-col items-center space-y-2 z-[1000]">
      {/* 마커 및 색상 선택 UI */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-3 rounded-xl shadow-lg flex flex-col items-center space-y-3"
        >
          {/* 색상 선택 버튼 */}
          <SketchPicker
            color={selectedColor}
            onChangeComplete={handleColorChange}
          />

          {/* 마커 선택 버튼 */}
          <div className="flex flex-col space-y-2">
            {MARKER_ICONS.map((marker, index) => (
              <button
                key={index}
                type="button"
                className={`w-12 h-12 flex items-center justify-center ${
                  selectedMarker.name === marker.name
                    ? 'border-2 border-blue-500 rounded-full'
                    : ''
                }`}
                onClick={() => handleMarkerSelect(marker)}
              >
                {marker.component({ className: 'w-8 h-8' })}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* 플로팅 버튼 */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 405 : 0 }} // 405도 회전 적용 (360도 + 45도)
        transition={{ duration: 0.3 }}
        className="w-14 h-14 bg-green-600 text-white flex items-center justify-center rounded-full shadow-lg z-[1003]"
      >
        {isOpen ? <X size={30} /> : <Plus size={30} />}
      </motion.button>
    </div>
  );
}
