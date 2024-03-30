// @mui
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

//localization
import useLocales from 'src/hooks/useLocales';
import { EmployeeLeaveDetails } from 'src/@types/attendanceReport';

// ----------------------------------------------------------------------

type Props = {
  ref: any;
  AttendanceLeaveOptions: EmployeeLeaveDetails[];
};

export default function AttendanceLeaveDetailsTable({ ref, AttendanceLeaveOptions }: Props) {
  const { translate } = useLocales();

  return (
    <>
      <Card sx={{ padding: '10px', marginLeft: '10px', paddingTop: '30px' }}>
        <Paper ref={ref} sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 550,
              '&::-webkit-scrollbar': { width: 5 },
              '&::-webkit-scrollbar-track': { backgroundColor: '999' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#555', borderRadius: 2 },
            }}
          >
            <Table stickyHeader aria-label="sticky table " size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{translate('Attendance.No')}</TableCell>
                  <TableCell>{translate('Attendance.LeaveTypeName')} </TableCell>
                  <TableCell>{translate('Attendance.AllowLeaveDays')}</TableCell>
                  <TableCell>{translate('Attendance.TakenDays')}</TableCell>
                  <TableCell>{translate('Attendance.Balance')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AttendanceLeaveOptions.map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.LeaveTypeName}</TableCell>
                    <TableCell>{row.AllowLeaveDay}</TableCell>
                    <TableCell>{row.TakenDays}</TableCell>
                    <TableCell>{row.Balance}</TableCell>
                  </TableRow>
                ))}
                {/* <TableNoData isNotFound={isNotFound} /> */}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Card>
    </>
  );
}
