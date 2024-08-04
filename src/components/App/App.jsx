import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';


const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));
const TestPage = lazy(() => import('../../pages/TestPage/TestPage.jsx'));

function App() {
  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
  );
}

export default App;
