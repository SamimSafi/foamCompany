import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets';

// ----------------------------------------------------------------------

type PermissionBasedGuardProp = {
  hasContent?: boolean;
  permissions?: string[];
  children?: React.ReactNode;
};

export default function PermissionBasedGuard({
  hasContent,
  permissions,
  children,
}: PermissionBasedGuardProp) {
  // Logic here to get current user role
  const getUserDataFromLocalStorage: any = localStorage.getItem('userData');

  const changeLocalStorgeStringToValue = JSON.parse(getUserDataFromLocalStorage);

  const is_super_admin = changeLocalStorgeStringToValue.IsSuperAdmin;


  const permission = changeLocalStorgeStringToValue.userpermission.map((data: any) => data.Name);

  const checkpermission =  permission.some((a:any)=>permissions?.includes(a))

  if (typeof permissions !== 'undefined' && !is_super_admin && !checkpermission) {

    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <>{children}</>;
}
