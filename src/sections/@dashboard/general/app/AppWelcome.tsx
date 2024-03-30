// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, CardProps } from '@mui/material';
const language = window.localStorage.getItem('i18nextLng');

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  img?: React.ReactNode;
}

export default function AppWelcome({ title, description, action, img, ...other }: AppWelcomeProps) {
  return (
    <RootStyle {...other}>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography
          gutterBottom
          variant={language === 'en' ? 'h5' : 'h4'}
          sx={{ whiteSpace: 'pre-line', textAlign: 'left' }}
        >
          {title}
        </Typography>

        <Typography variant="body1" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 600, textAlign: 'left' }}>
          {description}
        </Typography>

        {action && action}
      </CardContent>

      {img && img}
    </RootStyle>
  );
}
