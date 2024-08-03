import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));
const TrackerPage = lazy(() => import('../../pages/TrackerPage/TrackerPage.jsx'));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage.jsx"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/tracker" element={<TrackerPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
