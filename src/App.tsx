import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import NotFound from './pages/not-found';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
