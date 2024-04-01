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
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
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
import { IEmployeeDetails } from 'src/@types/foamCompanyTypes/Employee';
import { DateConverter } from 'src/sections/common/DateConverter';
import App from 'src/App';
import path from 'path';
import { PATH_AFTER_LOGIN } from 'src/config';

type Props = {
  row: IEmployeeDetails;
  clearEmployee: () => void;
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
export default function SupplierDetailTableRow({ row, clearEmployee }: Props) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const language = window.localStorage.getItem('i18nextLng');
  const [value, setValue] = useState('1');
  const {
    attendaceId,
    attendanceId,
    bloodGroup,
    tazkiraNo,
    dateOfBirth,
    department,
    district,
    emergencyPhoneNumber,
    employeeHealthState,
    englishFatherName,
    englishFirstName,
    englishGrandFatherName,
    englishSurName,
    gender,
    id,
    isCurrent,
    joinDate,
    leaveDate,
    leaveRemark,
    officialEmail,
    pashtoFatherName,
    pashtoFirstName,
    pashtoGrandFatherName,
    pashtoSurName,
    permenantAddress,
    personalEmail,
    phoneNumber,
    photoPath,
    provence,
    rfidNumber,
    temporaryAddress,
  } = row;
  let Url = baseUrl;
  return (
    <>
      <Grid item xs={6} md={6}>
        <Stack direction="row" spacing={1.5} sx={{ mt: 1, ml: 0, mb: 2 }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            onClick={() => {
              navigate(PATH_DASHBOARD.Employee.list);
              clearEmployee();
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
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  alt={englishFirstName}
                  src={Url + photoPath}
                  sx={{
                    width: 90,
                    height: 90,
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
                {language === 'en'
                  ? englishFirstName + ' ' + englishSurName
                  : pashtoFirstName + ' ' + pashtoSurName}
              </Typography>

              <Stack alignItems="center">
                <Typography variant="body2" sx={{ color: 'text.secondary', my: 2.5 }}>
                  {bloodGroup}
                </Typography>
              </Stack>
            </Card>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <Card sx={{ minWidth: 275, borderRadius: '15px 15px 0px 0px' }}>
              <Typography
                variant="h5"
                sx={{ fontSize: 14, textAlign: 'left', mb: 2, mt: 2, ml: 3, color: 'warning.main' }}
                color="text.secondary"
                gutterBottom
              >
                <Label
                  variant="ghost"
                  sx={{ textTransform: 'capitalize', fontSize: 17, p: 2 }}
                  color="warning"
                >
                  {translate('Employee.EmployeeGeneralInfo')}
                </Label>
              </Typography>
            </Card>
            <Box sx={{ mt: 2 }}>
              <Stack>
                <Stack spacing={2} sx={{ p: 3, mt: 1.5 }}>
                  <Stack direction="row">
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 0.75,
                        color: 'text.disabled',
                        fontSize: '16px',
                        fontWeight: 'bold',
                      }}
                    >
                      {translate('Employee.dateOfBirth')} :{' '}
                    </Typography>{' '}
                    &nbsp;
                    <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: '16px' }}>
                      {<DateConverter date={dateOfBirth} />}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.75, color: 'text.disabled', fontSize: '16px' }}
                    >
                      {translate('Employee.personalEmail')}:
                    </Typography>{' '}
                    &nbsp;
                    <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: '16px' }}>
                      {personalEmail}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.75, color: 'text.disabled', fontSize: '16px' }}
                    >
                      {translate('Employee.officialEmail')}:
                    </Typography>{' '}
                    &nbsp;
                    <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: '16px' }}>
                      {officialEmail}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.75, color: 'text.disabled', fontSize: '16px' }}
                    >
                      {translate('Employee.PhoneNumber')}:
                    </Typography>{' '}
                    &nbsp;
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.75, fontSize: '16px' }}
                      dir={language === 'en' ? 'ltr' : 'ltr'}
                    >
                      {' '}
                      {phoneNumber}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.75, color: 'text.disabled', fontSize: '16px' }}
                    >
                      {translate('Employee.cnic')}:
                    </Typography>{' '}
                    &nbsp;
                    <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: '16px' }}>
                      {tazkiraNo}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
        {/* sx={{ mt: 2, mr: 2, ml: 2, mb: 2 }} */}

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: '100%' }} size="small" aria-label="a dense table">
                {/* <caption>A basic table example with a caption</caption> */}
                <TableBody>
                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.AttendanceId')}
                    </TableCell>
                    <TableCell align="left">{attendanceId}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.Department')}
                    </TableCell>
                    <TableCell align="left">{department.name}</TableCell>
                  </TableRow>

                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.Province')}
                    </TableCell>
                    <TableCell align="left">{provence.name}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.District')}
                    </TableCell>
                    <TableCell align="left">{district.name}</TableCell>
                  </TableRow>

                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.temporaryAddress')}
                    </TableCell>
                    <TableCell align="left">{temporaryAddress}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.permanentAddress')}
                    </TableCell>
                    <TableCell align="left">{permenantAddress}</TableCell>
                  </TableRow>

                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.Gender')}
                    </TableCell>
                    <TableCell align="left">
                      {gender == true
                        ? `${translate('Employee.Male')}`
                        : `${translate('Employee.Female')}`}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.EmployeeHealthStatus')}
                    </TableCell>
                    <TableCell align="left">{employeeHealthState.name}</TableCell>
                  </TableRow>

                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.JoinDate')}
                    </TableCell>
                    <TableCell align="left">{<DateConverter date={joinDate} />}</TableCell>
                    {leaveDate != null && (
                      <>
                        <TableCell
                          align="left"
                          sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                        >
                          {translate('Employee.leaveDate')}
                        </TableCell>
                        <TableCell align="left">{<DateConverter date={leaveDate} />}</TableCell>
                      </>
                    )}
                  </TableRow>

                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.emergencyPhoneNumber')}
                    </TableCell>
                    <TableCell align="left" dir={language === 'en' ? 'ltr' : 'ltr'}>
                      {emergencyPhoneNumber}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.rfidNumber')}
                    </TableCell>
                    <TableCell align="left">{rfidNumber}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
