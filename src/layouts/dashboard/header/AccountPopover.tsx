import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import { baseUrl } from 'src/api/baseUrl';
//Localization
import useLocales from 'src/hooks/useLocales';
//import { id } from 'date-fns/locale';
// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     linkTo: '/',
//   },
//   {
//     label: 'Profile',
//     linkTo: PATH_DASHBOARD.user.profile(id),
//   },
// ];

// ----------------------------------------------------------------------

export default observer(function AccountPopover() {
  const { translate } = useLocales();
  const navigate = useNavigate();
  let Url = baseUrl;
  const isMountedRef = useIsMountedRef();
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const {
    UserStore: { loadProfile },
    LoginStore: { user, logout },
  } = useStore();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handaleOpenProfile = () => {
    loadProfile().then(() => {
      navigate(PATH_DASHBOARD.user.profile(user?.ID));
    });
  };

  const handleHome = () => {
    navigate(PATH_DASHBOARD.root);
  };
  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar alt={user?.UserName} src={Url! + user?.PhotoPath} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.UserName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.PositionTitle}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {/* {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))} */}
          <MenuItem
            onClick={() => {
              handleClose();
              handleHome();
            }}
          >
            {translate('Account.Home')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handaleOpenProfile();
            }}
          >
            {translate('Account.Profile')}
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          sx={{ m: 1 }}
          onClick={() => {
            logout();
            navigate(PATH_AUTH.login);
          }}
        >
          {translate('Account.Logout')}
        </MenuItem>
      </MenuPopover>
    </>
  );
});
