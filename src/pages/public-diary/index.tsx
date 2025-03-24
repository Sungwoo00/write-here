import { useEffect } from 'react';
import DiaryCard from '@/components/level-2/DiaryCard';
import useTableStore from '@/store/DiaryData';
import { tm } from '@/utils/tw-merge';

function PublicDiary() {
  const { fetchPublicDiaries, publicDiaries, loading, error } = useTableStore();

  useEffect(() => {
    fetchPublicDiaries();
  }, [fetchPublicDiaries]);

  if (loading.publicDiaries)
    return <p className="text-center">공개된 다이어리를 불러오는 중...</p>;
  if (error.publicDiaries)
    return <p className="text-center">에러: {error.publicDiaries}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full lg:pl-35 overflow-x-hidden">
      {publicDiaries.length > 0 ? (
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
          {publicDiaries.map((diary) => (
            <DiaryCard key={diary.diary_id} diary={diary} showLikeToggle />
          ))}
        </div>
      ) : (
        <p className="text-center">아직 공개된 다이어리가 없습니다.</p>
      )}
    </div>
  );
}

export default PublicDiary;
