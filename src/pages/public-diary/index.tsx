import { useEffect } from 'react';
import DiaryCard from '@/components/level-2/DiaryCard';
import useTableStore from '@/store/DiaryData';
import { tm } from '@/utils/tw-merge';

function PublicDiary() {
  const {
    fetchPublicDiaries,
    publicDiaries,
    loading,
    error,
    diarySearchKeyword,
    setDiarySearchKeyword,
  } = useTableStore();

  useEffect(() => {
    fetchPublicDiaries();
    setDiarySearchKeyword(''); // 페이지 진입 시 검색어 초기화
  }, [fetchPublicDiaries, setDiarySearchKeyword]);

  // 검색어 기반 필터링
  const filteredDiaries = publicDiaries.filter((diary) => {
    const query = diarySearchKeyword.toLowerCase();
    const title = diary.title?.toLowerCase() || '';
    const content = diary.content?.toLowerCase() || '';
    const tags = diary.tag?.join(',').toLowerCase() || '';
    return (
      title.includes(query) || content.includes(query) || tags.includes(query)
    );
  });

  if (loading.publicDiaries)
    return <p className="text-center">공개된 다이어리를 불러오는 중...</p>;
  if (error.publicDiaries)
    return <p className="text-center">에러: {error.publicDiaries}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full lg:pl-35 overflow-x-hidden">
      {/* 검색창 */}

      {/* ← 뒤로 가기 버튼 */}
      {diarySearchKeyword && (
        <div className="fixed top-18 left-6 z-[99]">
          <button
            onClick={() => setDiarySearchKeyword('')}
            className="text-sm font-[HSSanTokki] text-[var(--logo-green)] hover:opacity-80 transition flex items-center gap-1"
          >
            <span className="text-lg">←</span> 뒤로 가기
          </button>
        </div>
      )}

      {filteredDiaries.length > 0 ? (
        <div
          className={tm(
            'grid w-full gap-3 auto-rows-fr max-w-screen justify-items-center',
            'grid-cols-1',
            'sm:grid-cols-1',
            'md:grid-cols-2',
            '[@media_(min-width:1280px)]:grid-cols-3',
            '[@media_(min-width:1650px)]:grid-cols-4'
          )}
        >
          {filteredDiaries.map((diary) => (
            <DiaryCard key={diary.diary_id} diary={diary} showLikeToggle />
          ))}
        </div>
      ) : (
        <p className="text-center">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default PublicDiary;
