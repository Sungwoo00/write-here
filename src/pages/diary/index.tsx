import { useEffect } from 'react';
import DiaryCard from '@/components/level-2/DiaryCard';
import useDiaryStore from '@/store/diary';
import { tm } from '@/utils/tw-merge';

function Diary() {
  const { diaries } = useDiaryStore();

  useEffect(() => {
    console.log('현재 상태의 다이어리 목록:', diaries);
  }, [diaries]);

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
            <DiaryCard key={diary.title} title={diary.title} />
          ))}
        </div>
      ) : (
        <p className="text-center">아직 작성된 다이어리가 없습니다.</p>
      )}
    </div>
  );
}

export default Diary;
