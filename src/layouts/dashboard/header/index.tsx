// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Button } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import { useEffect, useState } from 'react';
import { useStore } from 'src/stores/store';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { store } from 'src/stores/store';
import { useSnackbar } from 'notistack';
import addNotification from 'react-push-notification';
import { baseUrl } from 'src/api/baseUrl';
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
import { language } from 'src/utils/general';
import agent from 'src/api/agent';
//
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------

type RootStyleProps = {
  isCollapse: boolean;
  isOffset: boolean;
  verticalLayout: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));


// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
  isCollapse?: boolean;
  verticalLayout?: boolean;
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}: Props) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'lg');
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const {

    LoginStore:{hubConnection,setHubConnection,isLogedIn}

  } = useStore();
  const { pathname } = useLocation();

// eslint-disable-next-line react-hooks/rules-of-hooks

const isDashboard = pathname.includes('/dashboard/app');


  const [tabHasFocus, setTabHasFocus] = useState(true);

  // const { loadApplicant } = ApplicantStore;

  const handleFocus = () => {
    setTabHasFocus(true);
  };

  const handleBlur = () => {
    setTabHasFocus(false);
  };


  useEffect(()=>{
    if(!isLogedIn){
      navigate(PATH_AUTH.login);
    }
  },[])

  useEffect(() => {
    if (process.env.NODE_ENV == 'development') {
      cookies.set('.AspNetCore.Culture', language(true)!);
    }
    //agent.changeLanguage.ChangeLanguage(language()!);
    const connect = new HubConnectionBuilder()
      .withUrl(baseUrl + `/signalr?userId=${store.LoginStore.user?.ID}`, {
        accessTokenFactory: () => window.localStorage.getItem('mewToken')!,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
    setHubConnection(connect);
    console.log(connect);
  }, []);


  useEffect(() => {
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [tabHasFocus]);


  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          <NotificationsPopover />
          <ContactsPopover />
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
