// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  Box,
  CardHeader,
  Avatar,
  Divider,
  Tab,
  Paper,
} from '@mui/material';
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import { PATH_DASHBOARD } from 'src/routes/paths';
import cssStyles from 'src/utils/cssStyles';
// @types
import { userDetail } from 'src/@types/createUser';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router';
import Label from 'src/components/Label';
import useLocales from '../../../../hooks/useLocales';
import { baseUrl } from 'src/api/baseUrl';

type Props = {
  row: userDetail;
  clearUser: () => void;
  clearUserDetail: () => void;
};
const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 0.2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));
const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));
export default function UserDetailTableRow({ row, clearUser, clearUserDetail }: Props) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const {
    userName,
    phoneNumber,
    email,
    isActive,
    userRoles,
    alloweddepartmentlevelModels,
    alloweddocumentLevelModels,
    alloweddocumenttypeModels,
    language,
    photoPath,
    positionName,
    profilePhoto,
    departmentName,
  } = row;
  return (
    <>
      <Grid item xs={6} md={6}>
        <Stack direction="row" spacing={1.5} sx={{ mt: 1, ml: 3, mb: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            onClick={() => {
              navigate(PATH_DASHBOARD.user.list);
              clearUser();
              clearUserDetail();
            }}
          >
            {translate('CRUD.BackToList')}
          </Button>
        </Stack>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 2, px: 2 }}>
            <Card sx={{ textAlign: 'center' }}>
              <Label
                color={isActive ? 'success' : 'error'}
                sx={{
                  textTransform: 'uppercase',
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 20,
                }}
              >
                {isActive ? `${translate('User.Active')}` : `${translate('User.Banned')}`}
              </Label>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  alt={userName}
                  src={baseUrl + photoPath}
                  sx={{
                    width: 64,
                    height: 64,
                    zIndex: 11,
                    left: 0,
                    right: 0,
                    bottom: -32,
                    mx: 'auto',
                    position: 'absolute',
                  }}
                />
                <OverlayStyle />
                <Image src={require('src/assets/images/dam.jpg')} alt="" ratio="16/9" />
              </Box>

              <Typography variant="subtitle1" sx={{ mt: 6 }}>
                {userName}
              </Typography>

              <Stack alignItems="center">
                <Typography variant="body2" sx={{ color: 'text.secondary', my: 2.5 }}>
                  {positionName ? positionName : `${translate('User.NoPositionAdded')}`}
                </Typography>
              </Stack>

              <Divider sx={{ borderStyle: 'dashed' }} />
              <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row">
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 0.75, color: 'text.disabled', fontSize: 12 }}
                  >
                    {translate('Department.Department')}:
                  </Typography>{' '}
                  &nbsp;
                  <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: 14 }}>
                    {departmentName}
                  </Typography>
                </Stack>

                <Stack direction="row">
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 0.75, color: 'text.disabled', fontSize: 12 }}
                  >
                    {translate('User.email')}:
                  </Typography>{' '}
                  &nbsp;
                  <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: 12 }}>
                    {email}
                  </Typography>
                </Stack>

                <Stack direction="row">
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 0.75, color: 'text.disabled', fontSize: 12 }}
                  >
                    {translate('User.phoneNumber')}:
                  </Typography>{' '}
                  &nbsp;
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 0.75, fontSize: 14 }}
                    dir={language === 'en' ? 'ltr' : 'ltr'}
                  >
                    {' '}
                    {phoneNumber}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 0.75, color: 'text.disabled', fontSize: 12 }}
                  >
                    {translate('User.Language')}:
                  </Typography>{' '}
                  &nbsp;
                  <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: 14 }}>
                    {language}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <TabContext value={value}>
              <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                <TabList onChange={(e, value) => setValue(value)}>
                  <Tab disableRipple value="1" label={translate('User.userRoles')} />
                  <Tab
                    disableRipple
                    value="2"
                    label={translate('User.SecurityLevel')}
                    sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                  />
                  <Tab
                    disableRipple
                    value="3"
                    label={translate('Department.Department')}
                    sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                  />
                  <Tab
                    disableRipple
                    value="4"
                    label={translate('DocumentType.DocType')}
                    sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                  />
                </TabList>
              </Box>

              <Divider />

              <TabPanel value="1">
                <Box sx={{ p: 3 }}>
                  <Card variant="outlined" sx={{ minWidth: 100 }}>
                    <CardHeader title={translate('User.userRoles')} />

                    <Stack spacing={4} sx={{ p: 1 }}>
                      <Grid item container direction="row" xs={12} sm={12}>
                        {userRoles.map((role) => (
                          <Grid key={role.id} item xs={6}>
                            <RoleCard
                              nameLabel={`${translate('userRole.RoleName')}:`}
                              name={role.name}
                              appLabel={`${translate('User.AppName')}:`}
                              application={role.application}
                              descLabel={`${translate('User.Description')}:`}
                              description={role.description}
                              permLabel={`${translate('userRole.TotalPermissions')}:`}
                              totalpermissions={role.totalPermissions}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Stack>
                  </Card>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box sx={{ p: 3 }}>
                  <Card variant="outlined" sx={{ minWidth: 100 }}>
                    <CardHeader title={translate('User.SecurityLevel')} />

                    <Stack spacing={4} sx={{ p: 1 }}>
                      <Grid item container direction="row" xs={12} sm={12}>
                        {alloweddocumentLevelModels.map((docLev) => (
                          <Grid key={docLev.id} item xs={6}>
                            <RoleCard
                              nameLabel={`${translate('User.EnglishName')}:`}
                              name={docLev.englishName}
                              descLabel={`${translate('User.PashtoName')}:`}
                              description={docLev.pashtoName}
                              permLabel={`${translate('User.DariName')}:`}
                              totalpermissions={docLev.dariName}
                              appLabel={`${translate('User.Code')}:`}
                              application={docLev.code}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Stack>
                  </Card>
                </Box>
              </TabPanel>

              {/* User Role Tab */}
              <TabPanel value="3">
                <Box sx={{ p: 3 }}>
                  <Card variant="outlined" sx={{ minWidth: 100 }}>
                    <CardHeader title={translate('Department.Department')} />

                    <Stack spacing={4} sx={{ p: 1 }}>
                      <Grid item container direction="row" xs={12} sm={12}>
                        {alloweddepartmentlevelModels.map((sec) => (
                          <Grid key={sec.id} item xs={6}>
                            <RoleCard
                              nameLabel={`${translate('User.EnglishName')}:`}
                              name={sec.englishName}
                              appLabel={`${translate('User.Code')}:`}
                              application={sec.code}
                              descLabel={`${translate('User.PashtoName')}:`}
                              description={sec.pashtoName}
                              permLabel={`${translate('User.DariName')}:`}
                              totalpermissions={sec.dariName}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Stack>
                  </Card>
                </Box>
              </TabPanel>

              {/* User Role Tab */}
              <TabPanel value="4">
                <Box sx={{ p: 3 }}>
                  <Card variant="outlined" sx={{ minWidth: 100 }}>
                    <CardHeader title={translate('DocumentType.DocType')} />

                    <Stack spacing={4} sx={{ p: 1 }}>
                      <Grid item container xs={12} sm={12}>
                        {alloweddocumenttypeModels.map((docTy) => (
                          <Grid key={docTy.id} item xs={6}>
                            <RoleCard
                              nameLabel={`${translate('User.EnglishName')}:`}
                              name={docTy.englishName}
                              appLabel={`${translate('User.Code')}:`}
                              application={docTy.code}
                              descLabel={`${translate('User.PashtoName')}:`}
                              description={docTy.pashtoName}
                              permLabel={`${translate('User.DariName')}:`}
                              totalpermissions={docTy.dariName}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Stack>
                  </Card>
                </Box>
              </TabPanel>
            </TabContext>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
interface smallCardProps {
  nameLabel: string;
  name: string;
  appLabel: string;
  application: string;
  descLabel: string;
  description: string;
  permLabel: string;
  totalpermissions: any;
}

function RoleCard({
  name,
  nameLabel,
  application,
  appLabel,
  description,
  descLabel,
  totalpermissions,
  permLabel,
}: smallCardProps) {
  return (
    <Stack sx={{ p: 1 }}>
      {/* <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} /> */}
      {/* <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {application}
          </Typography>
         
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {description}
          </Typography>
      </Box> */}
      {/* <Typography variant="subtitle2" noWrap>
          {totalpermissions}
        </Typography> */}
      <Paper
        sx={{
          p: 1,
          width: 1,
          backgroundColor: '#a9d39e',
        }}
      >
        <Typography variant="body2" sx={{ color: 'black' }}>
          <Typography variant="body2" component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
            {nameLabel} &nbsp;
          </Typography>
          {`${name}`}
        </Typography>

        <Typography variant="body2" sx={{ color: 'black' }}>
          <Typography variant="body2" component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
            {appLabel} &nbsp;
          </Typography>
          {`${application}`}
        </Typography>

        <Typography variant="body2" sx={{ color: 'black' }}>
          <Typography variant="body2" component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
            {descLabel} &nbsp;
          </Typography>
          {description}
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ color: 'black' }}>
          <Typography variant="body2" component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
            {permLabel} &nbsp;
          </Typography>
          {totalpermissions}
        </Typography>
      </Paper>
    </Stack>
  );
}
