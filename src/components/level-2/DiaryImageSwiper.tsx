import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

interface DiaryImageSwiperProps {
  images: string[]; // 다이어리의 img 데이터를 props로 받음
}

function DiaryImageSwiper({ images }: DiaryImageSwiperProps) {
  return (
    <div className="flex justify-center items-center bg-[var(--card-brown)] p-4 w-[90%] mx-auto shadow-md font-[Paperlogy] lg:py-30">
      <div className="w-full max-w-lg">
        {images.length > 0 ? (
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full h-[250px] overflow-hidden"
          >
            {images.map((url, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center bg-white"
              >
                <img
                  src={url}
                  alt={`다이어리 사진 ${index}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <SwiperSlide className="flex justify-center items-center text-[var(--dark-gray)]">
            이미지 없음
          </SwiperSlide>
        )}
      </div>
    </div>
  );
}

export default DiaryImageSwiper;
