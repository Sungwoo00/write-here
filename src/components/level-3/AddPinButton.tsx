import { useState } from 'react';
import { motion } from 'framer-motion';
import { SketchPicker } from 'react-color';
import { MapPin, Anchor, Map, Navigation, X, Plus } from 'lucide-react';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState('#3535AE');

  return (
    <div className="fixed bottom-10 left-10 flex flex-col items-center space-y-2">
      {/* 색상 선택기 */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-2"
        >
          <SketchPicker
            color={color}
            onChangeComplete={(color: { hex: string }) => setColor(color.hex)}
          />
        </motion.div>
      )}

      {/* 아이콘 메뉴 */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center space-y-3 bg-white p-3 rounded-xl shadow-lg"
        >
          <motion.div
            className="w-10 h-10 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
          />
          <MapPin color={color} size={24} />
          <Map color={color} size={24} />
          <Navigation color={color} size={24} />
          <Anchor color={color} size={24} />
        </motion.div>
      )}

      {/* 플로팅 버튼 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 135 : 0 }}
        transition={{ duration: 0.2 }}
        className="w-14 h-14 bg-green-600 text-white flex items-center justify-center rounded-full shadow-lg"
      >
        {isOpen ? <X size={30} /> : <Plus size={30} />}
      </motion.button>
    </div>
  );
}
