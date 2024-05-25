import { Navigate } from 'react-router-dom';
import { useUser } from '../providers/user.provider';
import { PageSpinner } from '../common/page-spinner/page-spinner.component';

export const ProtectedRoute = ({ children, redirectLink }) => {
  const { isLoading, user } = useUser();

  if (!user && !isLoading) {
    console.log(user, isLoading);
    return <Navigate to={redirectLink || '/login'} replace />;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  return children;
};
