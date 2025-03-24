import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/landing';
import NotFound from './pages/not-found';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import Diary from './pages/diary';
import DiaryDetail from './pages/diary-detail';
import Profile from './pages/profile';
import PublicDiary from './pages/public-diary';
import WriteHereMap from './pages/write-here-map';
import DiaryCalendar from './pages/diary-calendar';
import GoodBye from './pages/good-bye';
import { useEffect } from 'react';
import useTableStore from './store/DiaryData';
import { Toaster } from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function App() {
  const fetchCurrentUserData = useTableStore(
    (state) => state.fetchCurrentUserData
  );

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await fetchCurrentUserData();
      } catch (error) {
        console.error('초기화 실패:', error);
      }
    };

    initializeApp();
  }, [fetchCurrentUserData]);

  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{
          duration: 3500,
          style: {
            background: '#39673d',
            color: '#ffffff',
            fontFamily: 'HSSanTokki, sans-serif',
            fontSize: '14px',
            borderRadius: '999px',
            padding: '12px 20px',
            minWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          },
          icon: '❗',
        }}
        position="top-center"
        containerStyle={{
          top: '10%',
        }}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route path="/write-here-map" element={<WriteHereMap />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/public-diary" element={<PublicDiary />} />
            <Route path="/diary/:diary_id" element={<DiaryDetail />} />{' '}
            <Route path="/profile" element={<Profile />} />
            <Route path="/diary-calendar" element={<DiaryCalendar />} />
          </Route>

          <Route path="/good-bye" element={<GoodBye />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
