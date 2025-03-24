import React, { useEffect, useState, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

function ImageSwiper() {
  const [images, setImages] = useState<string[]>([]);
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, imageUrl]);
    });
  };

  useEffect(() => {
    if (swiperRef.current && images.length > 0) {
      if (swiperInstance.current) {
        swiperInstance.current.destroy();
      }

      swiperInstance.current = new Swiper(swiperRef.current, {
        modules: [Navigation],
        slidesPerView: 'auto',

        spaceBetween: 10,
        centeredSlides: false,

        loop: images.length > 3,
        speed: 500,
      });
    }

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy();
      }
    };
  }, [images]);

  return (
    <section className="max-w-screen p-4 ">
      <h2 className="text-xl font-bold mb-4 ">담고 싶은 추억</h2>

      <figure className=" flex flex-row items-center gap-4 mb-4">
        <label
          htmlFor="image-upload"
          className="bg-[var(--light-gray)] opacity-75 hover:opacity-100 flex justify-center items-center text-white w-12 h-12 rounded-sm cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_217_2322)">
              <path
                d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                stroke="#1E1E1E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                stroke="#1E1E1E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_217_2322">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <input
            id="image-upload"
            type="file"
            multiple
            accept=".png, .webp, .jpeg, .jpg"
            className="hidden"
            onChange={handleFileUpload}
            aria-label="이미지 파일 업로드"
          />
        </label>

        <div className="flex flex-1 p-1 overflow-hidden" ref={swiperRef}>
          <ul className="flex flex-1 swiper-wrapper">
            {images.map((image, index) => (
              <li key={index} className="swiper-slide !w-30 !h-20">
                <img
                  src={image}
                  alt={`이미지 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </figure>
    </section>
  );
}

export default ImageSwiper;
