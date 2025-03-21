import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShowMore from '@/components/level-1/ShowMore';
import Tag from '@/components/level-1/Tag';
import DiaryImageSwiper from '@/components/level-2/DiaryImageSwiper';
import LikeCounter from '@/components/level-2/LikeCounter';
import RendererSpring from '@/components/level-2/RendererSpring';
import supabase from '@/utils/supabase';
import { Tables } from '@/types/database.types';

function DiaryDetail() {
  const { diary_id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<Tables<'diaries'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchDiaryById = async () => {
      if (!diary_id) return;
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('diaries')
        .select('*')
        .eq('diary_id', Number(diary_id))
        .single();

      if (error) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } else {
        setDiary(data);
        setEditedContent(data.content || '');
      }
      setLoading(false);
    };

    fetchDiaryById();
  }, [diary_id]);

  if (loading) return <div className="text-center p-10">불러오는 중...</div>;
  if (error) return <div className="text-center p-10">{error}</div>;
  if (!diary)
    return <div className="text-center p-10">다이어리 데이터가 없습니다.</div>;

  // 수정 모드 활성화
  const handleEdit = () => setIsEditing(true);

  // 다이어리 삭제 기능
  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const { error } = await supabase
        .from('diaries')
        .delete()
        .eq('diary_id', Number(diary_id));

      if (error) {
        console.error('삭제 실패:', error);
        return;
      }

      navigate('/diary'); // 삭제 후 다이어리 목록 페이지로 이동
    }
  };

  // 다이어리 수정 기능
  const handleSaveEdit = async () => {
    const { error } = await supabase
      .from('diaries')
      .update({ content: editedContent })
      .eq('diary_id', Number(diary_id));

    if (error) {
      console.error('수정 실패:', error);
      return;
    }

    setDiary((prev) => (prev ? { ...prev, content: editedContent } : null));
    setIsEditing(false);
  };

  const handleNavigateToMap = () => {
    navigate('/write-here-map');
  };

  // 본문 줄 바꿈 유지 및 최소 5줄 유지
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
            {/* DiaryImageSwiper에 해당 다이어리의 이미지 배열 전달 */}
            <DiaryImageSwiper images={diary.img || []} />
          </div>

          {/* 콘텐츠 영역 */}
          <div className="p-8 lg:w-1/2">
            <div className="font-[Paperlogy]">
              <h3 className="text-xs lg:text-base text-[var(--logo-green)]">
                {diary.place}
              </h3>
              <h2 className="text-sm lg:text-xl">{diary.title}</h2>
            </div>

            {/* 밑줄 */}
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

            {/* 태그 표시 */}
            <div className="flex flex-wrap gap-2 mt-6">
              {diary.tag?.map((tag, index) => (
                <Tag key={index} tagText={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 지도 이동 버튼 */}
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
