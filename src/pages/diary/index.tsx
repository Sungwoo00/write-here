import { useEffect } from 'react';
import DiaryCard from '@/components/level-2/DiaryCard';
import useDiaryStore from '@/store/diary';

function Diary() {
  const addDiary = useDiaryStore((state) => state.addDiary);
  const diaries = useDiaryStore((state) => state.diaries);

  useEffect(() => {
    if (diaries.length === 0) {
      addDiary({
        title: '유저설정 제목',
        place: '성수동 카페거리',
        place_type: '카페',
        content:
          '오늘은 친구와 함께 성수동 카페거리를 방문했다. 블루보틀에서 커피를 마셨는데 분위기도 좋아서 자주 찾게 된다.',
        post_date: new Date('2025-02-21'),
        tag: ['카페', '성수', '커피', '데이트'],
        img: [],
        like_count: 0,
      });
    }
  }, [addDiary, diaries]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
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

export default Diary;
