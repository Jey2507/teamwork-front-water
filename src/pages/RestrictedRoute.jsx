import { useSelector } from 'react-redux';
import { selectIsLoggegIn } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function RestrictedRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggegIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}
