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
    content: '오늘은 친구와 함께 성수동 카페거리를 방문했다.',
    post_date: '2025-02-21',
    tag: ['카페', '성수', '커피', '데이트'],
    img: [],
    like_count: 0,
  },
  {
    title: '한강 나들이',
    place: '여의도 한강공원',
    place_type: '자연연',
    content: '날씨가 좋아서 한강에 나가 봤다. 치맥은 역시 최고다!',
    post_date: '2025-03-02',
    tag: ['한강', '공원', '소풍', '치맥'],
    img: [],
    like_count: 2,
  },
  {
    title: '제주도 여행',
    place: '우도',
    place_type: '자연연',
    content: '제주도 우도에서 전기 자전거를 타고 여행했다.',
    post_date: '2025-03-10',
    tag: ['제주도', '여행', '우도', '자전거'],
    img: [],
    like_count: 5,
  },
];

const savedVersion = localStorage.getItem('dummyDiariesVersion');
if (savedVersion !== DUMMY_DIARY_VERSION) {
  console.log('📌 localStorage 초기화 진행 중...');
  localStorage.clear();
  localStorage.setItem('dummyDiariesVersion', DUMMY_DIARY_VERSION);
}

const useDiaryStore = create<DiaryState>()(
  persist(
    (set, get) => ({
      diaries: dummyDiaries, // ✅ 기본 상태를 dummyDiaries로 설정

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

// ✅ 첫 실행 시 다이어리 데이터 강제 로드
useDiaryStore.getState().setDiaries(dummyDiaries);

export default useDiaryStore;
