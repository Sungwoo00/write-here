import { useState, useEffect } from 'react';

function ProfileStatus() {
  const [profile, setProfile] = useState({
    name: '우에우에',
    status: '나는야 모험가',
    avatar: '/images/profile.jpg',
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다!');
      return;
    }

    // 용량 제한 (2MB 이하)
    const MAX_SIZE_MB = 3;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(
        `파일 크기가 너무 큽니다! (${MAX_SIZE_MB}MB 이하의 파일만 업로드 가능)`
      );
      return;
    }

    // 기존에 생성된 URL 정리하기 -> 메모리 아끼기
    if (profile.avatar.startsWith('blob:')) {
      URL.revokeObjectURL(profile.avatar);
    }

    const imageUrl = URL.createObjectURL(file);
    setProfile((prevProfile) => ({ ...prevProfile, avatar: imageUrl }));

    /* 
    // 서버 업로드 코드 = 서버 연결 후 활성화 예정 
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("이미지 업로드 실패");

      const data = await response.json();
      setProfile((prevProfile) => ({ ...prevProfile, avatar: data.avatar }));
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
    */
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('데이터 가져오기 실패');

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center bg-white w-[293px] h-[73px] px-[15px] py-[10px] rounded-[22.3px] shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] relative font-[HSSanTokki]">
      <div className="flex flex-col mr-auto">
        <span className="text-xl">{profile.name}</span>
        <span className="text-[var(--dark-gray)] text-base">
          {profile.status}
        </span>
      </div>
      <div className="relative">
        <img
          src={profile.avatar}
          alt="프로필"
          className="w-[50px] h-[50px] rounded-full object-cover border-2 border-white shadow-sm"
        />
        <label className="absolute bottom-0 right-0 bg-white w-6 h-6 rounded-full shadow-md border hover:bg-[var(--light-gray)] cursor-pointer flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <img
            src="/public/icons/icon-pencil.svg"
            alt="편집"
            className="w-3 h-3"
          />
        </label>
      </div>
    </div>
  );
}

export default ProfileStatus;
