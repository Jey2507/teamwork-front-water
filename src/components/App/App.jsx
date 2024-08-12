import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import SharedLayout from '../SharedLayout/SharedLayout.jsx';
import RestrictedRoute from '../../pages/RestrictedRoute.jsx';
import PrivateRoute from '../../pages/PrivateRoute.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations.js';
import { selectIsRefreshing } from '../../redux/auth/selectors.js';
import Loader from '../Loader/Loader.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));
const TrackerPage = lazy(() => import('../../pages/TrackerPage/TrackerPage.jsx'));
const SignInPage = lazy(() => import('../../pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('../../pages/SignUpPage/SignUpPage.jsx'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  if (isRefreshing) {
    return <Loader />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/signin"
            element={<RestrictedRoute redirectTo="/tracker" component={<SignInPage />} />}
          />
          <Route
            path="/signup"
            element={<RestrictedRoute redirectTo="/tracker" component={<SignUpPage />} />}
          />
          <Route
            path="/tracker"
            element={<PrivateRoute redirectTo="/signin" component={<TrackerPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
