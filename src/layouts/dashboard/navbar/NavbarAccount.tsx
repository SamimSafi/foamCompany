import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Link, Typography } from '@mui/material';
// hooks
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import { baseUrl } from 'src/api/baseUrl';
import { id } from 'date-fns/locale';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

export default observer(function NavbarAccount({ isCollapse }: Props) {
  const navigate = useNavigate();
  const {
    UserStore: { loadProfile },
    LoginStore: { user, logout },
  } = useStore();
  let Url = baseUrl;
  return (
    <Link
      underline="none"
      color="inherit"
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        loadProfile().then(() => {
          navigate(PATH_DASHBOARD.user.profile(user?.ID));
        });
      }}
    >
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <Avatar alt={user?.UserName} src={Url! + user?.PhotoPath} />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {user?.UserName}{' '}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user?.PositionTitle}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
});
