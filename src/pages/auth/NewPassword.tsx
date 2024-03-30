// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import Page from '../../components/Page';
// sections
import { NewPasswordForm } from '../../sections/auth/new-password';
// assets
import { SentIcon } from '../../assets';
// localization
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function NewPassword() {
  const { translate } = useLocales();
  return (
    <Page title="New Password">
      <LogoOnlyLayout />

      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <SentIcon sx={{ mx: 'auto', height: 120 }} />

          <Box sx={{ mt: 5, mb: 3 }}>
            <NewPasswordForm />
          </Box>

          <Typography variant="body2">
            {translate('login.DontHaveACode')} &nbsp;
            <Link variant="subtitle2" onClick={() => {}}>
              {translate('login.ResendCode')}
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
