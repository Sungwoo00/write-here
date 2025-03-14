import { getUserId } from '@/utils/auth';
import supabase from '@/utils/supabase';
import { useState } from 'react';

function ProfileStatus() {
  const [profile, setProfile] = useState({
    name: '우에우에',
    status: '나는야 모험가',
    avatar: '/images/profile.jpg',
  });

  // 파일명 정리 함수 (한글, 공백, 특수문자 제거)
  const sanitizeFileName = (fileName: string) => {
    return fileName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // 한글 정규화 방지
      .replace(/\s+/g, '_') // 공백을 _로 변환
      .replace(/[^\w.-]/g, ''); // 영문, 숫자, 점(.), 하이픈(-)만 허용
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다!');
      return;
    }

    const MAX_SIZE_MB = 3;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(
        `파일 크기가 너무 큽니다! (${MAX_SIZE_MB}MB 이하의 파일만 업로드 가능)`
      );
      return;
    }

    if (profile.avatar.startsWith('blob:')) {
      URL.revokeObjectURL(profile.avatar);
    }

    const imageUrl = URL.createObjectURL(file);
    setProfile((prevProfile) => ({ ...prevProfile, avatar: imageUrl }));

    try {
      const userId = await getUserId();
      if (!userId) {
        alert('유저 정보를 불러오지 못했습니다. 다시 로그인해주세요.');
        return;
      }

      // 안전한 파일명 생성
      const timestamp = new Date().getTime();
      const safeFileName = sanitizeFileName(file.name);
      const filePath = `${userId}/${timestamp}_${safeFileName}`;

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
        });

      if (error) throw error;

      // 업로드한 이미지의 Public URL 가져오기
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      if (!urlData || !urlData.publicUrl) {
        throw new Error('파일 URL을 가져오는 데 실패했습니다.');
      }

      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar: urlData.publicUrl,
      }));
    } catch (error: any) {
      console.error('이미지 업로드 실패:', error.message);
      alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex items-center bg-white w-[293px] h-[73px] px-[15px] py-[10px] rounded-[22.3px] shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] relative font-[HSSanTokki] lg:w-[352px] lg:h-[88px] lg:px-[18px] lg:py-[12px]">
      <div className="flex flex-col mr-auto">
        <span className="text-xl lg:text-2xl">{profile.name}</span>
        <span className="text-[var(--dark-gray)] text-base lg:text-lg">
          {profile.status}
        </span>
      </div>
      <div className="relative">
        <img
          src={profile.avatar}
          alt="프로필"
          className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full object-cover border-2 border-white shadow-sm"
        />
        <label className="absolute bottom-0 right-0 bg-white w-6 h-6 lg:w-7 lg:h-7 rounded-full shadow-md border hover:bg-[var(--light-gray)] cursor-pointer flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <img
            src="/public/icons/icon-pencil.svg"
            alt="편집"
            className="w-3 h-3 lg:w-4 lg:h-4"
          />
        </label>
      </div>
    </div>
  );
}

export default ProfileStatus;
