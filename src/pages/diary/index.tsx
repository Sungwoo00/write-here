import { useEffect, useState } from 'react';
import DiaryCard from '@/components/level-2/DiaryCard';
import useTableStore from '@/store/DiaryData';
import type { Diary } from '@/store/DiaryData';
import { tm } from '@/utils/tw-merge';

function Diary() {
  const {
    fetchCurrentUserData,
    fetchDiaries,
    loading,
    error,
    diarySearchKeyword,
    setDiarySearchKeyword,
  } = useTableStore();

  const [diaries, setDiaries] = useState<Diary[]>([]);

  // 페이지 진입 시 검색 키워드 초기화
  useEffect(() => {
    setDiarySearchKeyword('');
  }, [setDiarySearchKeyword]);

  useEffect(() => {
    fetchCurrentUserData();
    const loadDiaries = async () => {
      await fetchDiaries();
      setDiaries(useTableStore.getState().diaries);
    };
    loadDiaries();
  }, [fetchCurrentUserData, fetchDiaries]);

  // 검색 키워드 기반 필터링
  const filteredDiaries = diaries.filter((diary) => {
    const query = diarySearchKeyword.toLowerCase();
    const title = diary.title?.toLowerCase() || '';
    const content = diary.content?.toLowerCase() || '';
    const tags = diary.tag?.join(',').toLowerCase() || '';
    return (
      title.includes(query) || content.includes(query) || tags.includes(query)
    );
  });

  if (loading.diaries)
    return <p className="text-center">다이어리를 불러오는 중...</p>;
  if (error.diaries)
    return <p className="text-center">에러 발생: {error.diaries}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full lg:pl-35 overflow-x-hidden">
      {/* ✅ 검색 키워드 있을 때만 "전체 일기 보기" 버튼 노출 */}
      {diarySearchKeyword && (
        <div className="fixed top-18 left-6 z-[99]">
          <button
            onClick={() => setDiarySearchKeyword('')}
            className="text-md font-[HSSanTokki] text-[var(--logo-green)] hover:opacity-80 transition flex items-center gap-1"
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
            <DiaryCard key={diary.diary_id} diary={diary} />
          ))}
        </div>
      ) : (
        <p className="text-center">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default Diary;
