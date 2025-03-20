import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowMore from '@/components/level-1/ShowMore';
import Tag from '@/components/level-1/Tag';
import DiaryImageSwiper from '@/components/level-2/DiaryImageSwiper';
import LikeCounter from '@/components/level-2/LikeCounter';
import RendererSpring from '@/components/level-2/RendererSpring';
import useDiaryStore from '@/store/diary';

function DiaryDetail() {
  const navigate = useNavigate();
  const { diaries, setDiaries } = useDiaryStore();

  // diary 상태 추가하여 관리
  const [diary, setDiary] = useState(diaries.length > 0 ? diaries[0] : null);

  useEffect(() => {
    setDiary(diaries.length > 0 ? diaries[0] : null);
  }, [diaries]);

  // editedContent를 diary.content와 동기화
  const [editedContent, setEditedContent] = useState(
    diary ? diary.content : ''
  );

  useEffect(() => {
    setEditedContent(diary ? diary.content : '');
  }, [diary]);

  const [isEditing, setIsEditing] = useState(false);

  if (!diary) {
    return <div className="text-center p-10">다이어리 데이터가 없습니다.</div>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedDiaries = diaries.filter(
        (item) => item.title !== diary.title
      );
      setDiaries(updatedDiaries);
      setDiary(updatedDiaries.length > 0 ? updatedDiaries[0] : null); // 삭제 후 diary 업데이트
    }
  };

  const handleSaveEdit = () => {
    const updatedDiaries = diaries.map((item) =>
      item.title === diary.title ? { ...item, content: editedContent } : item
    );
    setDiaries(updatedDiaries);

    // 상태 업데이트를 위해 변경된 diary 찾아서 설정하기
    const updatedDiary = updatedDiaries.find(
      (item) => item.title === diary.title
    );
    setDiary(updatedDiary || null);

    setIsEditing(false);
  };

  const handleNavigateToMap = () => {
    navigate('/write-here-map');
  };

  // 최소 5줄 보장 (줄 간격 유지)
  const contentLines = editedContent.split('\n');
  while (contentLines.length < 5) {
    contentLines.push(' ');
  }

  return (
    <div className="w-full overflow-x-auto px-5">
      <div className="m-5 mt-8 relative flex-grow border border-black rounded-lg lg:ml-30 min-w-[384px] overflow-visible">
        <RendererSpring className="absolute -top-11 inset-0 -z-10" />

        {/* 상단 좋아요 및 메뉴 버튼 */}
        <div className="flex place-content-between mx-10 my-6">
          <LikeCounter />
          <ShowMore onEdit={handleEdit} onDelete={handleDelete} />
        </div>

        <div className="block lg:flex lg:flex-row">
          <div className="lg:w-1/2">
            <DiaryImageSwiper />
          </div>

          {/* 콘텐츠 영역 */}
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
              {diary.tag.map((tag, index) => (
                <Tag key={index} tagText={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-30 text-center">
        <button
          onClick={handleNavigateToMap}
          className="text-[var(--logo-green)] font-[HSSanTokki]"
        >
          지도에서 확인하기👣
        </button>
      </div>
    </div>
  );
}

export default DiaryDetail;
