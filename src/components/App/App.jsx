/* import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage.jsx"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
} */

/* export default App; */ 

import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ModalProvider } from '../ModalContext.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));
const TestPage = lazy(() => import('../../pages/TestPage/TestPage.jsx'));

function App() {
  return (
    <ModalProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ModalProvider>
  );
}

export default App;
