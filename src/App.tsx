import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Landing from './pages/landing';
import NotFound from './pages/not-found';
import SignIn from './pages/sign-in';
import LikeCounter from './components/level-2/LikeCounter';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <LikeCounter />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
