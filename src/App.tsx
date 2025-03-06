import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Landing from './pages/landing';
import NotFound from './pages/not-found';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
