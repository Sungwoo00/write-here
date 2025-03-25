import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import useTableStore from '@/store/DiaryData';

type CustomError = {
  message: string;
  cause?: unknown;
};

function ProfileStatus() {
  const { profiles, currentUserId } = useTableStore();

  const userProfile = profiles.find((p) => p.user_id === currentUserId);

  const [profile, setProfile] = useState({
    name: userProfile?.nickname || '사용자',
    status: userProfile?.profile_msg || '상태 메시지를 입력하세요.',
    avatar: userProfile?.profile_img || '/images/profile.jpg',
  });

  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.nickname || '사용자',
        status: userProfile.profile_msg || '상태 메시지를 입력하세요.',
        avatar: userProfile.profile_img || '/images/profile.jpg',
      });
    }
  }, [userProfile]);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempAvatarPreview, setTempAvatarPreview] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isPopupOpen) {
      setTempProfile(profile);
    }
  }, [isPopupOpen, profile]);

  const togglePopup = () => {
    if (tempAvatarPreview && tempAvatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(tempAvatarPreview);
    }
    setTempAvatarPreview(null);
    setSelectedFile(null);
    setPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      if (!currentUserId) {
        alert('유저 정보를 불러오지 못했습니다. 다시 로그인해주세요.');
        return;
      }

      let newAvatarUrl = profile.avatar;

      if (selectedFile) {
        const filePath = `${currentUserId}/${selectedFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        if (!urlData || !urlData.publicUrl) {
          throw new Error('파일 URL을 가져오는 데 실패했습니다.');
        }

        newAvatarUrl = urlData.publicUrl;
      }

      const { error, data: updateData } = await supabase
        .from('profiles')
        .update({
          nickname: tempProfile.name,
          profile_msg: tempProfile.status,
          profile_img: newAvatarUrl,
        })
        .eq('user_id', currentUserId);

      console.log('DB 업데이트 결과:', { 에러: error, 데이터: updateData });

      if (error) throw error;

      const newProfile = {
        name: tempProfile.name,
        status: tempProfile.status,
        avatar: newAvatarUrl,
      };
      console.log('새로운 프로필 상태:', newProfile);

      setProfile(newProfile);

      if (tempAvatarPreview && tempAvatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(tempAvatarPreview);
      }
      setTempAvatarPreview(null);
      setSelectedFile(null);
      setPopupOpen(false);

      setTimeout(() => {
        console.log('최종 업데이트 후 상태:', {
          프로필: profile,
          스토어프로필: profiles.find((p) => p.user_id === currentUserId),
        });
      }, 100);

      console.log('Store 데이터 갱신 시도');
      await useTableStore.getState().fetchProfiles(currentUserId);

      console.log('Store 데이터 갱신 완료');

      setTimeout(() => {
        console.log('Store 갱신 후 최종 상태:', {
          프로필: profile,
          스토어프로필: useTableStore
            .getState()
            .profiles.find((p) => p.user_id === currentUserId),
        });
      }, 500);
    } catch (error: unknown) {
      const err = error as PostgrestError | CustomError;
      console.error('프로필 업데이트 실패:', err.message);
      console.error('에러 상세:', error);
      alert('프로필 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedExtensions = ['image/png', 'image/jpeg'];
    if (!allowedExtensions.includes(file.type)) {
      alert('PNG 또는 JPG 형식의 이미지 파일만 업로드 가능합니다!');
      return;
    }

    const MAX_SIZE_MB = 3;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(
        `파일 크기가 너무 큽니다! (${MAX_SIZE_MB}MB 이하의 파일만 업로드 가능)`
      );
      return;
    }

    if (tempAvatarPreview && tempAvatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(tempAvatarPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setTempAvatarPreview(previewUrl);
    setSelectedFile(file);
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
              src="/icons/icon-pencil.svg"
              alt="편집"
              className="w-3 h-3 lg:w-4 lg:h-4"
            />
          </button>
        </div>
      </div>

      {/* 프로필 수정 팝업 */}
      {isPopupOpen && (
        <div className="absolute top-[80px] lg:top-[100px] left-1/2 transform -translate-x-1/2 bg-white w-[280px] font-[Paperlogy] lg:w-[320px] p-4 rounded-xl shadow-xl z-[2000]">
          <h2 className="text-lg font-semibold mb-2">프로필 수정</h2>

          {/* 닉네임 입력 */}
          <div className="mb-2">
            <label
              htmlFor="name-input"
              className="text-sm text-[var(--dark-gray)]"
            >
              닉네임
            </label>
            <input
              id="name-input"
              type="text"
              name="name"
              value={tempProfile.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* 상태 메시지 입력 */}
          <div className="mb-2">
            <label
              htmlFor="status-input"
              className="text-sm text-[var(--dark-gray)]"
            >
              상태 메시지
            </label>
            <input
              id="status-input"
              type="text"
              name="status"
              value={tempProfile.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* 프로필 이미지 업로드 */}
          <div className="mb-4">
            <label
              htmlFor="profile-upload"
              className="text-sm text-[var(--dark-gray)]"
            >
              프로필 사진 변경
            </label>
            <input
              id="profile-upload"
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
