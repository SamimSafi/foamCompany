// @mui
import {
  alpha,
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
import { AttendanceReportResult } from 'src/@types/attendanceReport';

// ----------------------------------------------------------------------

type Props = {
  ref: any;
  AttendanceReportOptions: AttendanceReportResult[];
};

export default function AttendanceTable({ ref, AttendanceReportOptions }: Props) {
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
                  <TableCell>{translate('Attendance.DayOfWeek')} </TableCell>
                  <TableCell>{translate('Attendance.QamariDate')}</TableCell>
                  <TableCell>{translate('Attendance.ShamsiDate')}</TableCell>
                  <TableCell>{translate('Attendance.InTime')}</TableCell>
                  <TableCell>{translate('Attendance.OutTime')}</TableCell>
                  <TableCell>{translate('Attendance.AttendanceSummary')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AttendanceReportOptions.map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{
                      backgroundColor:
                        row.holiday == 'Holiday'
                          ? alpha('#9e9e9e', 0.5)
                          : row.absentOnly == 'Absent'
                          ? alpha('#ff8a80', 0.4)
                          : '',
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.DayValue}</TableCell>
                    <TableCell>{new Date(row.DateValue).toLocaleDateString()}</TableCell>
                    <TableCell>{row.DateShami}</TableCell>
                    <TableCell>{row.Intime}</TableCell>
                    <TableCell>{row.Outtime}</TableCell>
                    <TableCell>{row.AttResult}</TableCell>
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
