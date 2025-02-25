import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/page';
import NotFound from './pages/not-found/page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
