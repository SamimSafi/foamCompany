// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack, Button } from '@mui/material';
// @types
import { Profile } from '../../../../@types/user';
// components
import Iconify from '../../../../components/Iconify';
import { userDetail } from 'src/@types/createUser';
//Localization
import useLocales from 'src/hooks/useLocales';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useNavigate, useLocation } from 'react-router-dom';
// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

type Props = {
  profile: userDetail;
};

export default function ProfileAbout({ profile }: Props) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const { userName, phoneNumber, email, language, positionName, departmentName } = profile;

  return (
    <>
      <Card>
        <CardHeader title={translate('User.About')} />

        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row">
            <IconStyle icon={'mingcute:department-fill'} />
            <Typography variant="body2">
              {translate('Department.Department')}: &nbsp;{departmentName}
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={'material-symbols:attach-email'} />

            <Typography variant="body2">
              {translate('User.email')}: &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {email}
              </Link>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={'material-symbols:contact-phone'} />
            <Typography variant="body2">
              {translate('User.Contact')}: &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {phoneNumber}
              </Link>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={'material-symbols:work'} />

            <Typography variant="body2">
              {' '}
              {translate('User.positionTitle')}: &nbsp;{positionName}
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={'material-symbols:language'} />
            <Typography variant="body2">
              {translate('User.Language')}: &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {language}
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Card>
      <Button
        fullWidth
        variant="contained"
        color="error"
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        onClick={() => {
          navigate(PATH_DASHBOARD.root);
        }}
      >
        {translate('CRUD.BackToList')}
      </Button>
    </>
  );
}
