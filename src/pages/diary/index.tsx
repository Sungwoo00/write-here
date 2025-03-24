import { useEffect, useState } from 'react';
import DiaryCard from '@/components/level-2/DiaryCard';
import useTableStore from '@/store/DiaryData';
import type { Diary } from '@/store/DiaryData';
import { tm } from '@/utils/tw-merge';

function Diary() {
  const { fetchCurrentUserData, fetchDiaries, loading, error } =
    useTableStore();
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    fetchCurrentUserData();
    const loadDiaries = async () => {
      await fetchDiaries();
      setDiaries(useTableStore.getState().diaries);
    };
    loadDiaries();
  }, [fetchCurrentUserData, fetchDiaries]);

  if (loading.diaries)
    return <p className="text-center">다이어리를 불러오는 중...</p>;
  if (error.diaries)
    return <p className="text-center">에러 발생: {error.diaries}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full lg:pl-35 overflow-x-hidden">
      {diaries.length > 0 ? (
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
          {diaries.map((diary) => (
            <DiaryCard key={diary.diary_id} diary={diary} />
          ))}
        </div>
      ) : (
        <p className="text-center">아직 작성된 다이어리가 없습니다.</p>
      )}
    </div>
  );
}

export default Diary;
