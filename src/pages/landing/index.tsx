import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Landing() {
  return (
    <div className="relative flex flex-grow flex-col items-center justify-center font-[HSSanTokki] bg-[var(--light-beige)]">
      <div className="gap-[25px] flex flex-grow flex-col items-center justify-center">
        <h2 className="text-xl md:text-[28px] text-[var(--logo-green)]">
          여기 저기
        </h2>
        <h3 className="text-lg md:text-2xl text-[var(--dark-gray)]">
          당신의 발자취를 적어보세요
        </h3>
        <h6 className="text-xs md:text-sm text-[var(--dark-gray)]">
          특별한 순간들을 기록하고 공유하세요
        </h6>
        <Link to="/sign-in">
          <button
            type="button"
            className="bg-[var(--logo-green)] text-xs md:text-sm text-white px-[23px] py-[9px] rounded-xl"
          >
            여행 시작하기
          </button>
        </Link>
      </div>

      <DotLottieReact
        src="/animations/location-ping.json"
        loop
        autoplay
        className="absolute top-1/3 right-20 transform -translate-y-1/2 w-20 md:w-24"
      />
      <DotLottieReact
        src="/animations/foot-prints.json"
        loop
        autoplay
        className="absolute top-1/2 right-4 -rotate-90 transform -translate-y-1/2 w-80"
      />
    </div>
  );
}

export default Landing;
