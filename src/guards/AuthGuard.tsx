import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
// pages
import Login from '../pages/auth/Login';
// components
import LoadingScreen from '../components/LoadingScreen';
import { useStore } from 'src/stores/store';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { pathname } = useLocation();
  const {
    LoginStore: { isLogedIn,user },
  } = useStore();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  console.log(user);
  // if (!isLogedIn) {
  //   if (pathname !== requestedLocation) {
  //     setRequestedLocation(pathname);
  //   }
  //   return <Login />;
  // }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
