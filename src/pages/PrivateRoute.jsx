import { useSelector } from 'react-redux';
import { selectIsLoggegIn, selectIsRefreshing } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggegIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isAuth = !isLoggedIn && !isRefreshing;

  return isAuth ? <Navigate to={redirectTo} /> : component;
}
