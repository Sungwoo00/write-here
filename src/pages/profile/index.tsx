import ProfileStatus from '@/components/level-2/ProfileStatus';
import ProfileRecord from '@/components/level-2/ProfileRecord';
import ProfileInfo from '@/components/level-2/ProfileInfo';
import { useState, useEffect } from 'react';

function Profile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* 닉네임 (모바일 중앙 정렬, 데스크탑 왼쪽 이동) */}
      <div
        className={`w-full ${isMobile ? 'flex justify-center' : 'pl-[10rem]'}`}
      >
        <ProfileStatus />
      </div>

      {/* 컨텐츠 컨테이너 (모바일: 세로 정렬, 데스크탑: 가로 정렬) */}
      <div
        className={`w-full flex ${
          isMobile
            ? 'flex-col items-center gap-6'
            : 'flex-row justify-center gap-16'
        } mt-6`}
      >
        {/* 왼쪽 (닉네임 아래 차트) */}
        <ProfileRecord />

        {/* 오른쪽 (앱 정보) */}
        <ProfileInfo />
      </div>
    </div>
  );
}

export default Profile;
