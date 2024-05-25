import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../providers/user.provider';
import { PageSpinner } from '../common/page-spinner/page-spinner.component';

export const PublicRoute = ({ children, redirectLink = '/' }) => {
  const currentPath = useLocation().pathname;
  //const accessToken = localStorage.getItem('accessToken');
  const { isLoading, user } = useUser();

  const restrictedRoutes = ['/login', '/register'];

  if (!isLoading && user && restrictedRoutes.includes(currentPath)) {
    return <Navigate to={redirectLink} replace />;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  return children;
};
