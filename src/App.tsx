import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import NotFoundPage from './pages/not-found/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
