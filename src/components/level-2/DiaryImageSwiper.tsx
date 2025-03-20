import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import supabase from '@/utils/supabase';

function DiaryImageSwiper() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase.from('diaries').select('img');

        if (error) throw error;

        // 이미지 데이터가 배열로 저장되어 있을 경우 처리
        const urls = data
          .flatMap((diary) => diary.img) // 배열 평탄화 (여러 개 이미지가 있을 경우)
          .filter(Boolean); // null 값 제거

        setImageUrls(urls); // 상태 업데이트
      } catch (error) {
        console.error('이미지 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="flex justify-center items-center bg-[var(--card-brown)] p-4 w-[90%] mx-auto shadow-md font-[Paperlogy] lg:py-30">
      <div className="w-full max-w-lg ">
        {loading ? (
          <div className="h-[250px] flex justify-center items-center text-[var(--dark-gray)]">
            이미지 로딩 중...
          </div>
        ) : (
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full h-[250px] overflow-hidden"
          >
            {imageUrls.length > 0 ? (
              imageUrls.map((url, index) => (
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
              ))
            ) : (
              <SwiperSlide className="flex justify-center items-center text-[var(--dark-gray)]">
                이미지 없음
              </SwiperSlide>
            )}
          </Swiper>
        )}

        {/* 날짜 표시 (나중에 서버 데이터 연동 가능) */}
        <div className="text-center mt-4 text-lg font-semibold text-black ">
          DD/MM/YYYY
        </div>
      </div>
    </div>
  );
}

export default DiaryImageSwiper;
