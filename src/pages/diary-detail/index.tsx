import { useParams, useNavigate } from 'react-router-dom';
import ShowMore from '@/components/level-1/ShowMore';
import Tag from '@/components/level-1/Tag';
import DiaryImageSwiper from '@/components/level-2/DiaryImageSwiper';
import LikeCounter from '@/components/level-2/LikeCounter';
import RendererSpring from '@/components/level-2/RendererSpring';
import { useEffect, useState } from 'react';
import useTableStore from '@/store/DiaryData';
import supabase from '@/utils/supabase';
import { useMapStore } from '@/store/Map';
import Modal from '@/components/level-2/Modal';

function DiaryDetail() {
  const { diary_id } = useParams();
  const navigate = useNavigate();

  const diaries = useTableStore((state) => state.diaries);
  const publicDiaries = useTableStore((state) => state.publicDiaries);
  const loading = useTableStore((state) => state.loading.diaries);
  const fetchDiaries = useTableStore((state) => state.fetchDiaries);
  const fetchPublicDiaries = useTableStore((state) => state.fetchPublicDiaries);
  const currentUserId = useTableStore((state) => state.currentUserId);
  const updateDiary = useTableStore((state) => state.updateDiary);
  const removeDiary = useTableStore((state) => state.removeDiary);
  const markers = useTableStore((state) => state.markers);

  const setCurrentLocation = useMapStore((state) => state.setCurrentLocation);

  const diary =
    diaries.find((d) => d.diary_id === Number(diary_id)) ??
    publicDiaries.find((d) => d.diary_id === Number(diary_id));

  const [editedContent, setEditedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  useEffect(() => {
    if (!diary && currentUserId) {
      fetchDiaries();
      fetchPublicDiaries();
    }
  }, [diary, currentUserId, fetchDiaries, fetchPublicDiaries]);

  useEffect(() => {
    if (diary) {
      setEditedContent(diary.content || '');
    }
  }, [diary]);

  if (loading) return <div className="text-center p-10">불러오는 중...</div>;
  if (!diary)
    return <div className="text-center p-10">다이어리 데이터가 없습니다.</div>;

  const handleEdit = () => setIsEditing(true);

  const handleSaveEdit = async () => {
    const { error } = await supabase
      .from('diaries')
      .update({ content: editedContent })
      .eq('diary_id', Number(diary_id));

    if (!error) {
      updateDiary({ ...diary, content: editedContent });
      setIsEditing(false);
    } else {
      console.error('수정 실패:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const { error } = await supabase
        .from('diaries')
        .delete()
        .eq('diary_id', Number(diary_id));

      if (!error) {
        removeDiary(Number(diary_id));
        navigate('/diary');
      } else {
        console.error('삭제 실패:', error);
      }
    }
  };

  const handleNavigateToMap = () => {
    if (!diary?.marker_id) {
      setModalMsg('이 다이어리에는 위치 정보가 없습니다.');
      setIsModalOpen(true);
      return;
    }

    const marker = markers.find((m) => m.marker_id === diary.marker_id);

    if (!marker) {
      setModalMsg('해당 마커 정보를 찾을 수 없습니다.');
      setIsModalOpen(true);
      return;
    }

    setCurrentLocation(marker.lat, marker.lon);
    navigate('/write-here-map');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const contentLines = editedContent.split('\n');
  while (contentLines.length < 5) contentLines.push(' ');

  const handleModalButtonClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full overflow-x-auto px-5">
      <div className="m-5 mt-8 relative flex-grow border border-black rounded-lg lg:ml-30 min-w-[384px] overflow-visible">
        <RendererSpring className="absolute -top-11 inset-0 -z-10" />

        <div className="flex place-content-between mx-10 my-6">
          <LikeCounter />
          {diary.user_id === currentUserId && (
            <ShowMore onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>

        <div className="block lg:flex lg:flex-row">
          <div className="lg:w-1/2">
            <DiaryImageSwiper images={diary.img || []} />
          </div>

          <div className="p-8 lg:w-1/2">
            <div className="font-[Paperlogy]">
              <h3 className="text-xs lg:text-base text-[var(--logo-green)]">
                {diary.place}
              </h3>
              <h2 className="text-sm lg:text-xl">{diary.title}</h2>
            </div>

            <div className="mt-4 p-4 bg-white min-h-[120px] lg:min-h-[240px] flex flex-col justify-between">
              {isEditing ? (
                <>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-40 lg:h-64 p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--logo-green)] text-xs"
                  />
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-1 bg-[var(--logo-green)] text-white rounded-md hover:bg-[var(--logo-dark-green)] transition-all"
                    >
                      수정 완료
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-gray-700 whitespace-pre-line flex flex-col relative">
                  {contentLines.map((line, index) => (
                    <p
                      key={index}
                      className="text-xs font-[Paperlogy] leading-[2rem] relative"
                      style={{
                        backgroundImage:
                          'linear-gradient(to bottom, transparent 90%, rgba(200, 200, 200, 0.5) 95%)',
                        backgroundSize: '100% 2rem',
                        backgroundRepeat: 'repeat-y',
                        top: '-5px',
                      }}
                    >
                      {line.trim() === '' ? '\u00A0' : line}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {diary.tag?.map((tag, index) => (
                <Tag key={index} tagText={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-30 text-center">
        <button
          onClick={handleNavigateToMap}
          className="text-[var(--logo-green)] font-[HSSanTokki] hover:underline block mx-auto"
        >
          지도에서 확인하기 👣
        </button>

        <button
          onClick={handleGoBack}
          className="mt-4 text-[var(--dark-gray)] font-[HSSanTokki] hover:underline block mx-auto"
        >
          이전으로 돌아가기 🡸
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        buttonConfirmText="확인"
        buttonCancelText="닫기"
        onConfirm={handleModalButtonClick}
        onClose={handleModalButtonClick}
      >
        <p className="min-h-15 mt-2 text-[var(--dark-gray)] text-center">
          {modalMsg}
        </p>
      </Modal>
    </div>
  );
}

export default DiaryDetail;
