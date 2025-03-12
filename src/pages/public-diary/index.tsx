import DiaryCard from '@/components/level-2/DiaryCard';
import DiaryRegister from '@/components/level-3/DiaryRegister';
import useDiaryStore from '@/store/diary';

function PublicDiary() {
  const diaries = useDiaryStore((state) => state.diaries);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <DiaryRegister />

      {diaries.length > 0 ? (
        diaries.map((diary) => (
          <DiaryCard key={diary.title} title={diary.title} />
        ))
      ) : (
        <p>아직 작성된 다이어리가 없습니다.</p>
      )}
    </div>
  );
}

export default PublicDiary;
