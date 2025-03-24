import Modal from '@/components/level-2/Modal';
import supabase from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileStatus from './../../components/level-2/ProfileStatus';
import ProfileRecord from '@/components/level-2/ProfileRecord';
import ProfileInfo from '@/components/level-2/ProfileInfo';

function Profile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => Promise<void>>(
    () => async () => {}
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 실패:', error.message);
      return;
    }
    navigate('/');
  };

  const deleteUser = async () => {
    const { error } = await supabase.rpc('delete_current_user');
    if (error) {
      console.error('회원탈퇴 실패:', error.message);
      return;
    }
    navigate('/good-bye');
  };

  const handleSignOutClick = () => {
    setModalMsg('로그아웃 하시겠습니까?');
    setOnConfirm(() => signOut);
    setIsModalOpen(true);
  };

  const handleDeleteUserClick = () => {
    setModalMsg('정말로 회원탈퇴 하시겠습니까?');
    setOnConfirm(() => deleteUser);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* ✅ 닉네임 (모바일 중앙 정렬, 데스크탑 왼쪽 이동) */}
      <div
        className={`w-full ${isMobile ? 'flex justify-center' : 'pl-[10rem]'}`}
      >
        <ProfileStatus />
      </div>

      {/* ✅ 컨텐츠 컨테이너 (모바일: 세로 정렬, 데스크탑: 가로 정렬) */}
      <div
        className={`w-full flex ${
          isMobile ? 'flex-col items-center' : 'flex-row justify-center gap-12'
        } mt-6`}
      >
        {/* ✅ 왼쪽 (닉네임 아래 차트) */}
        <ProfileRecord />

        {/* ✅ 오른쪽 (앱 정보) */}
        <ProfileInfo />
      </div>

      {/* ✅ 로그아웃 & 회원탈퇴 버튼 (아래 위치) */}
      <div className="flex flex-col items-center font-[HSSanTokki] mt-6">
        <button
          type="button"
          className="text-[var(--icon-red)] hover:underline cursor-pointer"
          onClick={handleSignOutClick}
        >
          로그아웃
        </button>
        <button
          type="button"
          className="text-[var(--icon-red)] hover:underline cursor-pointer"
          onClick={handleDeleteUserClick}
        >
          회원탈퇴
        </button>
        <Modal
          isOpen={isModalOpen}
          buttonConfirmText="확인"
          buttonCancelText="취소"
          onConfirm={onConfirm}
          onClose={() => setIsModalOpen(false)}
        >
          <p className="min-h-15 mt-2 text-[var(--dark-gray)] text-center">
            {modalMsg}
          </p>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
