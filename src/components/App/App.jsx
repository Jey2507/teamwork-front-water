import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import TrackerPage from '../../pages/TrackerPage/TrackerPage.jsx';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />

      <Route path="*" element={<NotFoundPage />} />
      <TrackerPage />
    </Routes>
    
  );
}

export default App;
