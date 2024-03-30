// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, CardProps, Grid, Button } from '@mui/material';
import Scrollbar from 'src/components/Scrollbar';
import { DateConverter } from 'src/sections/common/DateConverter';
import DashboardWidget from 'src/pages/dashboard/DashboardWidget';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useStore } from 'src/stores/store';
import NewsAlertWidget from 'src/pages/dashboard/NewsAlertWidget';
const language = window.localStorage.getItem('i18nextLng');

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '14%',
  },
}));

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  title?: string;
  description?: string;
  data?: {
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    newsDate: string;
    speaker: string;
    location: string;
    attachmentPath: string;
  }[];
  action?: React.ReactNode;
  img?: React.ReactNode;
}

export default function NewsCard({
  title,
  description,
  action,
  img,
  data,
  ...other
}: AppWelcomeProps) {

  return (
    <RootStyle {...other}>
      <Scrollbar sx={{ height: { xs: 400, sm: 'auto', lg: 300 } }}>
        <CardContent
          sx={{
            p: { md: 0 },
            pl: { md: 5 },
            color: 'white.600',
            width: '100%',
            mt: 2,
          }}
        >
          
        </CardContent>
      </Scrollbar>
      {action && action}

      {img && img}
    </RootStyle>
  );
}
