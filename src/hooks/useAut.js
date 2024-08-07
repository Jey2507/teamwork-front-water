import { useSelector } from 'react-redux';
import { selectIsLoggegIn, selectIsRefreshing, selectUser, selectToken } from '../redux/auth/selectors';

export const useAuth = () => {
    const isLoggedIn = useSelector(selectIsLoggegIn);
    const isRefreshing = useSelector(selectIsRefreshing);
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    return {
        isLoggedIn,
        isRefreshing,
        user,
        token,
    };
};