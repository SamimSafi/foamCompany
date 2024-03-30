import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from 'src/stores/store';
// hooks
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  
  const {
    LoginStore: { isLogedIn },
  } = useStore();
  if (isLogedIn) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
