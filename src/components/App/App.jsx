import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const TestPage = lazy(() => import('../../pages/TestPage/TestPage.jsx'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));
const TrackerPage = lazy(() => import('../../pages/TrackerPage/TrackerPage.jsx'));
const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('../../pages/SignUpPage/SignUpPage.jsx'));


function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
