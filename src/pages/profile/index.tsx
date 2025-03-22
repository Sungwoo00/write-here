import Modal from '@/components/level-2/Modal';
import supabase from '@/utils/supabase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileStatus from './../../components/level-2/ProfileStatus';
import MyDiaryStats from '@/components/level-2/ProfileRecord'; // ✅ 추가

function Profile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => Promise<void>>(
    () => async () => {}
  );

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
    <>
      <ProfileStatus />

      {/* ✅ MyDiaryStats 컴포넌트 추가 */}
      <div className="mb-6">
        <MyDiaryStats />
      </div>

      <div className="flex-grow flex flex-col font-[HSSanTokki]">
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
    </>
  );
}

export default Profile;
