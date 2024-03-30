import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, TableCell } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from '../../config';
//
import DashboardHeader from './header';
import NavbarVertical from './navbar/NavbarVertical';
import NavbarHorizontal from './navbar/NavbarHorizontal';
import { AppWelcome } from 'src/sections/@dashboard/general/app';
import { SpeakerIllustration } from 'src/assets';
import NewsCard from 'src/sections/@dashboard/general/app/NewsCard';
import { useStore } from 'src/stores/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import MyDialog from 'src/components/MyDialog';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Typography } from '@mui/material';
import { DateConverter } from 'src/sections/common/DateConverter';
import { Table } from '@mui/material';
import { TableRow } from '@mui/material';
import { getDateFromDateTime, getTimeFromDate, stripHtmlTags } from 'src/utils/general';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})<MainStyleProps>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));
const dataNews = [
  {
    title: 'News Title',
    description:
      'سازمان هواشناسی آمریکا نسبت به شرایط ناپاپدار در امتداد سواحل کالیفرنیا هشدار داده‌ که با موج‌های عظیم همراه شده است.از جمله این شرایط جریان شکافنده است که مرگبار است و خطر غرق شدن را به همراه دارد. امواجی به ارتفاع حدود ۱۰ متر در چندین نقطه در کالیفرنیا دیده شده و در برخی مناطق محوطه‌های ساحلی زیر آب رفته‌اند که خساراتی را به همراه داشته است.روز جمعه، به بیش از ۶ میلیون نفر در سراسر کالیفرنیا و اورگن در این باره هشدار داده شد و سازمان هواشناسی گفت: «از صخره‌ها، اسکله‌ها، و سایر زیرساخت‌های کنار آب دوری کنید و هرگز به اقیانوس پشت نکنید',
  },
  { title: 'News Title', description: 'Description' },
];
// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { translate } = useLocales();
  const { collapseClick, isCollapse } = useCollapseDrawer();


  const { themeLayout } = useSettings();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const verticalLayout = themeLayout === 'vertical';
 

  const handleClose = () => {
    setOpen(false);
  };

  if (verticalLayout) {
    return (
      <>
        <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

        {isDesktop ? (
          <NavbarHorizontal />
        ) : (
          <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        )}

        <Box
          component="main"
          sx={{
            px: { lg: 2 },
            pt: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
            },
            pb: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
            },
          }}
        >
          <Outlet />
        </Box>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />

      <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle collapseClick={collapseClick}>

        <Outlet />
      </MainStyle>

    </Box>
  );
}
