import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

const DUMMY_DIARY_VERSION = '1.0'; 

interface DiaryEntry {
  title: string;
  place: string;
  place_type: string;
  content: string;
  post_date: string;
  tag: string[];
  img: File[];
  like_count: number;
}

interface DiaryState {
  diaries: DiaryEntry[];
  setDiaries: (newDiaries: DiaryEntry[]) => void;
  removeDiary: (title: string) => void;
  toggleLike: (title: string) => void;
}

const dummyDiaries: DiaryEntry[] = [
  {
    title: '블루 보틀',
    place: '성수동 카페거리',
    place_type: '카페',
    content:
      '오늘은 친구와 함께 성수동 카페거리를 방문했다. 블루보틀에서 커피를 마셨는데 분위기도 좋아서 자주 찾게 된다.',
    post_date: '2025-02-21',
    tag: ['카페', '성수', '커피', '데이트', '안녕'],
    img: [],
    like_count: 0,
  },
];

const savedVersion = localStorage.getItem('dummyDiariesVersion');
if (savedVersion !== DUMMY_DIARY_VERSION) {
  localStorage.clear();
  localStorage.setItem('dummyDiariesVersion', DUMMY_DIARY_VERSION);
}

const useDiaryStore = create<DiaryState>()(
  persist(
    (set) => ({
      diaries: dummyDiaries,

      setDiaries: (newDiaries: DiaryEntry[]) =>
        set(() => ({
          diaries: newDiaries,
        })),

      removeDiary: (title: string) =>
        set((state: DiaryState) => ({
          diaries: state.diaries.filter((diary) => diary.title !== title),
        })),

      toggleLike: (title: string) => {
        set((state: DiaryState) => ({
          diaries: state.diaries.map((diary) =>
            diary.title === title
              ? { ...diary, like_count: diary.like_count + 1 }
              : diary
          ),
        }));
      },
    }),
    {
      name: 'diary-storage',
      getStorage: () => localStorage,
      serialize: (state: DiaryState) => JSON.stringify(state),
      deserialize: (str: string): DiaryState => JSON.parse(str) as DiaryState,
    } as PersistOptions<DiaryState>
  )
);

export default useDiaryStore;
