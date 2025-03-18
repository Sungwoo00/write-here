import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // 로딩 추가예정
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
