import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

interface DiaryImageSwiperProps {
  images: string[];
}

function DiaryImageSwiper({ images }: DiaryImageSwiperProps) {
  return (
    <div className="flex justify-center items-center bg-[var(--card-brown)] p-4 w-[90%] mx-auto shadow-md font-[Paperlogy] lg:py-30">
      <div className="w-full max-w-lg relative">
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

        <style>
          {`
            .swiper-pagination {
              position: absolute;
              bottom: 8px;
              left: 50%;
              transform: translateX(0%);
              z-index: 10;
            }

            .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background-color: transparent;
              border: 1.5px solid white;
              opacity: 1;
            }

            .swiper-pagination-bullet-active {
              background-color: var(--logo-dark-green);
              border: 1px solid white;
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default DiaryImageSwiper;
