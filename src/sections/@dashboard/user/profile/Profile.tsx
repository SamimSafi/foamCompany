// @mui
import { Box, Card, CardHeader, Divider, Grid, Paper, Stack, Tab, Typography } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { userDetail } from 'src/@types/createUser';
import { baseUrl } from 'src/api/baseUrl';
//Localization
import useLocales from 'src/hooks/useLocales';
import Scrollbar from 'src/components/Scrollbar';

// ----------------------------------------------------------------------

type Props = {
  myProfile: userDetail;
};
let Url = baseUrl;

export default function Profile({ myProfile }: Props) {
  const { translate } = useLocales();
  const [value, setValue] = useState('1');
  const {
    userRoles,
    alloweddepartmentlevelModels,
    alloweddocumentLevelModels,
    alloweddocumenttypeModels,
  } = myProfile;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileAbout profile={myProfile} />
        </Stack>
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
                  <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 500 }, mt: 2, mb: 2 }}>
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
                  </Scrollbar>
                </Card>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ p: 3 }}>
                <Card variant="outlined" sx={{ minWidth: 100 }}>
                  <CardHeader title={translate('User.SecurityLevel')} />
                  <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 500 }, mt: 2, mb: 2 }}>
                    <Stack spacing={4} sx={{ p: 1 }}>
                      <Grid item container direction="row" xs={12} sm={12}>
                        {alloweddocumentLevelModels.map((docLev) => (
                          <Grid key={docLev.id} item xs={6}>
                            <RoleCard
                              nameLabel={`${translate('User.EnglishName')}:`}
                              name={docLev.englishName}
                              appLabel={`${translate('User.Code')}:`}
                              application={docLev.code}
                              descLabel={`${translate('User.PashtoName')}:`}
                              description={docLev.pashtoName}
                              permLabel={`${translate('User.DariName')}:`}
                              totalpermissions={docLev.dariName}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Stack>
                  </Scrollbar>
                </Card>
              </Box>
            </TabPanel>

            {/* User Role Tab */}
            <TabPanel value="3">
              <Box sx={{ p: 3 }}>
                <Card variant="outlined" sx={{ minWidth: 100 }}>
                  <CardHeader title={translate('Department.Department')} />
                  <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 500 }, mt: 2, mb: 2 }}>
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
                  </Scrollbar>
                </Card>
              </Box>
            </TabPanel>

            {/* User Role Tab */}
            <TabPanel value="4">
              <Box sx={{ p: 3 }}>
                <Card variant="outlined" sx={{ minWidth: 100 }}>
                  <CardHeader title={translate('DocumentType.DocType')} />
                  <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 500 }, mt: 2, mb: 2 }}>
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
                  </Scrollbar>
                </Card>
              </Box>
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
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
