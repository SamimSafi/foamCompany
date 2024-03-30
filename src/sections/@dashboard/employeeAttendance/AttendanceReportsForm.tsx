import * as Yup from 'yup';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Iconify from 'src/components/Iconify';
import { useStore } from 'src/stores/store';
import { observer } from 'mobx-react-lite';
import useLocales from 'src/hooks/useLocales';

import AttendanceDetailsToolbar from './AttendanceDetailsToolbar';

import {
  AttendanceReport,
  AttendanceReportResult,
  EmployeeDetail,
  EmployeeLeaveDetails,
} from 'src/@types/attendanceReport';
import AttendanceTable from './AttendanceTable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttendanceLeaveDetailsTable from './AttendanceLeaveDetailsTable';
import EmployeeDetails from './EmployeeDetails';
import EmptyContent from 'src/components/EmptyContent';
import Loader from 'src/components/loader/Loader';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
import { convertPersianNumberToEnlgish } from 'src/utils/convertPersianNumber';
import { language } from 'src/utils/general';
import MyDialog from 'src/components/MyDialog';
import { RHFTextField } from 'src/components/hook-form';
import agent from 'src/api/agent';

// ----------------------------------------------------------------------
export default observer(function AttendanceReportsForm() {
  const { translate } = useLocales();
  const [isReady, setIsReady] = useState('none');
  const {
    LoginStore: { user },
  } = useStore();
  const [isloading, setIsloading] = useState(false);
const [openDialog,setOpenCloseDialog]=useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewExternalDocumentSchema = Yup.object().shape({
    fromDate: Yup.date().required('From Date is required'),
    toDate: Yup.date().required('To Date is required'),
  });

  const defaultValues = useMemo<AttendanceReport>(
    () => ({
      fromDate: new Date(),
      toDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      employeeID: undefined,
    }),
    []
  );

  const methods = useForm<AttendanceReport>({
    // resolver: yupResolver(NewInternalDocumentSchema),
    defaultValues,
  });

  const { reset, control, setValue, watch } = methods;
  const val = watch();

  const [employeeAttendance, setEmployeeAttendance] = useState<AttendanceReportResult[]>([]);

  const [employeeDetail, setemployeeDetail] = useState<EmployeeDetail>();
  const [ipAddress, setIpAddress] = useState('');
  const [showError,setShowError]=useState("false");
  const [employeeLeave, setEmployeeLeave] = useState<EmployeeLeaveDetails[]>([]);

  const [userName,setUserName]=useState("");
  let componentRef = useRef<any>(null);

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);
  useEffect(() => {}, [isReady]);

  const attendanceAPI = async (fromDate: string, toDate: string, empAttendanceID?: number) => {
    
      const leave = await fetch(
        'http://ams.mew//api/GetEmployeeAttendanceRelatedInfo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: 58,
            userNameInAtt: userName,
            serverIP: ipAddress,
            lang: language(true),
            fromDate: fromDate,
            toDate: toDate,
            userDetail: user?.UserName + "," + user?.PositionTitle
          })
        }
      )
        .then((res) => res.json())
        .then((res) => {
          
          console.log(res);
          if(res.Data !== null){
            setOpenCloseDialog(!openDialog)
            setEmployeeAttendance(res.Data.AttendanceResults);
            setemployeeDetail(res.Data.EmployeeInfo[0]);
            setEmployeeLeave(res.Data.EmployeeLeaveBalance);
            setShowError("false");
            setTimeout(()=>{
              
              
              setIsloading(false);
            },1000)
          }else{
            setShowError(res.Message)
          }
          });

  };

  const Search =  async (e: any) => {
    e.preventDefault();
    if(userName.length !=0){
    const response =  await agent.changeLanguage.getIpAndMac();
    const data =  await response.data;
    setIpAddress(data.serverIP)
    setTimeout(()=>{      
      employeeAttendance.length = 0;
    setIsloading(true);
    attendanceAPI(
      convertPersianNumberToEnlgish(
        val.fromDate?.toLocaleDateString('fa-IR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        ).replaceAll('/', '-'),
        convertPersianNumberToEnlgish(
          val.toDate?.toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          ).replaceAll('/', '-')
          );
        },500)
      }else{
        setShowError("Please Enter User Name");
      }
  };

  return (
    <>
      {/* onSubmit={handleSubmit(onSubmit)} */}

      <Grid container display="flex" alignItems="center" justifyItems={'center'}>
        <Grid item xs={12} md={12} spacing={2}>
          {/*  */}
          <Card
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyItems: 'center',
            }}
          >
            <Grid item xs={10} md={10}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <LocalizDatePicker
                  name="fromDate"
                  label={translate('Attendance.FromDate')}
                  control={control}
                />

                <LocalizDatePicker
                  name="toDate"
                  label={translate('Attendance.ToDate')}
                  control={control}
                  isDisablePast={false}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              md={2}
              sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}
            >
              <Button
                sx={{ ml: 2 }}
                // fullWidth
                size="medium"
                variant="contained"
                //loading={isSubmitting}
                onClick={(e: any) => setOpenCloseDialog(!openDialog)}
                startIcon={<Iconify icon="eva:search-fill" />}
              >
                {translate('InternalDocumentReport.Filter')}
              </Button>
              <AttendanceDetailsToolbar AttendanceReportResult={employeeAttendance} />
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
   
            <>
              { employeeDetail?.ID != undefined && isloading ? 
                <Loader />
               : 
                <HistoryAccordian
                  EmployeeAttendance={employeeAttendance}
                  EmployeeDetail={employeeDetail!}
                  EmployeeLeaveDetail={employeeLeave}
                />
              }
            </>
        </Grid>
      </Grid>
      <MyDialog
        open={openDialog}
        onClose={()=>setOpenCloseDialog(!openDialog)}
        title={""}
        size="md"
      >
         <DialogTitle>
           Attendance User Name
         </DialogTitle>
         <DialogContent sx={{mb:2}}>
          {
            showError != "false" ? 
            <Alert severity="error">{showError}</Alert>:<></>
          }
  <DialogContentText id="alert-dialog-slide-description">
  <TextField
  sx={{mt:2}}
  type="text"
  name="userName"
  fullWidth
  onChange={(e) => {
    setUserName(e.target.value);
    setShowError("false");
  }}
  label="User Name"
  variant="outlined"
/>
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={(e)=> Search(e)}>Submit</Button>
</DialogActions>
      </MyDialog>
    </>
  );
});

type Attendance = {
  EmployeeAttendance: AttendanceReportResult[];
  EmployeeDetail: EmployeeDetail;
  EmployeeLeaveDetail: EmployeeLeaveDetails[];
};
function HistoryAccordian({ EmployeeAttendance, EmployeeDetail, EmployeeLeaveDetail }: Attendance) {
  const statusColors = {
    Completed: '#6dcf7d',
    Approve: '#3d85c6',
    Reject: '#fe908e',
    Sent: '#f9ef9e',
  };
  const { translate } = useLocales();
  let componentRef = useRef<any>(null);
  return (
    <>
      <Stack sx={{ p: 1 }}>
        <Accordion disableGutters sx={{ borderBottom: 2 }}>
          <AccordionSummary
            sx={{ borderRadius: 2 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{translate('Attendance.PersonalInformation')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EmployeeDetails ref={componentRef} EmployeeDetailOptions={EmployeeDetail} />
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack sx={{ p: 1 }}>
        <Accordion disableGutters sx={{ borderBottom: 2 }}>
          <AccordionSummary
            sx={{ borderRadius: 2 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{translate('Attendance.AttendanceRecord')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AttendanceTable ref={componentRef} AttendanceReportOptions={EmployeeAttendance} />
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack sx={{ p: 1 }}>
        <Accordion disableGutters sx={{ borderBottom: 2 }}>
          <AccordionSummary
            sx={{ borderRadius: 2 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{translate('Attendance.LeaveDetail')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AttendanceLeaveDetailsTable
              ref={componentRef}
              AttendanceLeaveOptions={EmployeeLeaveDetail}
            />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </>
  );
}
