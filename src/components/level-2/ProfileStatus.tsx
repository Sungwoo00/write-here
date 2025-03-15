import { useEffect, useState } from 'react';
import { getUserId } from '@/utils/auth';
import supabase from '@/utils/supabase';

function ProfileStatus() {
  const [profile, setProfile] = useState({
    name: '사용자',
    status: '상태 메시지를 입력하세요.',
    avatar: '/images/profile.jpg',
  });

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  // 프로필 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = await getUserId();
        if (!userId) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('nickname, profile_msg, profile_img')
          .eq('user_id', userId)
          .single();

        if (error) throw error;

        setProfile({
          name: data.nickname || '사용자',
          status: data.profile_msg || '상태 메시지를 입력하세요.',
          avatar: data.profile_img || '/images/profile.jpg',
        });
      } catch (error: any) {
        console.error('프로필 불러오기 실패:', error.message);
      }
    };

    fetchProfile();
  }, []);

  const togglePopup = () => {
    setTempProfile(profile);
    setPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  // 프로필 업데이트 (닉네임, 상태 메시지)
  const handleSaveProfile = async () => {
    try {
      const userId = await getUserId();
      if (!userId) {
        alert('유저 정보를 불러오지 못했습니다. 다시 로그인해주세요.');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          nickname: tempProfile.name,
          profile_msg: tempProfile.status,
        })
        .eq('user_id', userId);

      if (error) throw error;

      setProfile(tempProfile);
      setPopupOpen(false);
    } catch (error: any) {
      console.error('프로필 업데이트 실패:', error.message);
      alert('프로필 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 프로필 이미지 업로드 (PNG, JPG만 허용)
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // PNG, JPG(JPEG)만 업로드 가능하도록 제한
    const allowedExtensions = ['image/png', 'image/jpeg'];
    if (!allowedExtensions.includes(file.type)) {
      alert('PNG 또는 JPG 형식의 이미지 파일만 업로드 가능합니다!');
      return;
    }

    // 파일 크기 3MB 초과 시 제한
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

    try {
      const userId = await getUserId();
      if (!userId) {
        alert('유저 정보를 불러오지 못했습니다. 다시 로그인해주세요.');
        return;
      }

      const filePath = `${userId}/${file.name}`;

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600' });

      if (error) throw error;

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

      // DB에 프로필 이미지 URL 업데이트
      await supabase
        .from('profiles')
        .update({ profile_img: urlData.publicUrl })
        .eq('user_id', userId);
    } catch (error: any) {
      console.error('이미지 업로드 실패:', error.message);
      alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-white w-[293px] h-[73px] px-[15px] py-[10px] rounded-[22.3px] shadow-md lg:w-[352px] lg:h-[88px] lg:px-[18px] lg:py-[12px]">
      {/* 프로필 정보 */}
      <div className="flex items-center w-full font-[HSSanTokki]">
        <div className="flex flex-col mr-auto">
          <span className="text-xl lg:text-2xl">{profile.name}</span>
          <span className="text-[var(--dark-gray)] text-base lg:text-lg">
            {profile.status}
          </span>
        </div>
        {/* 프로필 이미지 */}
        <div className="relative">
          <img
            src={profile.avatar}
            alt="프로필"
            className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full object-cover border-2 border-white shadow-sm"
          />
          {/* 연필 버튼 (클릭 시 팝업 열기) */}
          <button
            onClick={togglePopup}
            className="absolute bottom-0 right-0 bg-white w-6 h-6 lg:w-7 lg:h-7 rounded-full shadow-md border hover:bg-[var(--light-gray)] cursor-pointer flex justify-center items-center"
          >
            <img
              src="/public/icons/icon-pencil.svg"
              alt="편집"
              className="w-3 h-3 lg:w-4 lg:h-4"
            />
          </button>
        </div>
      </div>

      {/* 프로필 수정 팝업 */}
      {isPopupOpen && (
        <div className="absolute top-[80px] lg:top-[100px] left-1/2 transform -translate-x-1/2 bg-white w-[280px] font-[Paperlogy] lg:w-[320px] p-4 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-2">프로필 수정</h2>

          {/* 닉네임 입력 */}
          <div className="mb-2">
            <label className="text-sm text-[var(--dark-gray)]">닉네임</label>
            <input
              type="text"
              name="name"
              value={tempProfile.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* 상태 메시지 입력 */}
          <div className="mb-2">
            <label className="text-sm text-[var(--dark-gray)]">
              상태 메시지
            </label>
            <input
              type="text"
              name="status"
              value={tempProfile.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* 프로필 이미지 업로드 */}
          <div className="mb-4">
            <label className="text-sm text-[var(--dark-gray)]">
              프로필 사진 변경
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* 버튼들 */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={togglePopup}
              className="px-4 py-2 bg-[var(--light-gray)] rounded-md hover:bg-[var(--dark-gray)]"
            >
              취소
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-[var(--logo-green)] text-white rounded-md hover:bg-[var(--logo-dark-green)]"
            >
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileStatus;
