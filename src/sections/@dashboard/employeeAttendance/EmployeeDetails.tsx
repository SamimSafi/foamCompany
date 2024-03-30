import { Card, Box, Typography, Table, TableRow, TableCell } from '@mui/material';
import React from 'react';
import { EmployeeDetail } from 'src/@types/attendanceReport';
import useLocales from 'src/hooks/useLocales';

type Props = {
  ref: any;
  EmployeeDetailOptions: EmployeeDetail;
};
export default function EmployeeDetails({ref, EmployeeDetailOptions }: Props) {
  const { translate } = useLocales();
  return (
    <>
      <Card ref={ref}  sx={{ pt: 2, pb: 2, px: 5, mb: 1 }}>
        <Box
          sx={{
            textAlign: { sm: 'center' },
            mb: 3,
            overflowX: 'scroll',
            overflowY: 'hidden',
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-track': { backgroundColor: '999' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#555', borderRadius: 2 },
          }}
        >
          {
            EmployeeDetailOptions?.ID != undefined ? <>
             <Typography
            variant="h5"
            sx={{ fontSize: 14, textAlign: 'center', mb: 2, color: 'warning.main' }}
            color="text.secondary"
            gutterBottom
          >
            {translate('Attendance.GeneralInformation')}
          </Typography>
          <Box>
            <Table sx={{ minWidth: '100%' }} size="small" aria-label="a dense table">
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {translate('Attendance.IDCard')}:{' '}
                </TableCell>
                <TableCell align="left"> {EmployeeDetailOptions.ID} </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('Attendance.Name')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                  {EmployeeDetailOptions.Name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('Attendance.Job')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {EmployeeDetailOptions.Job}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('Attendance.Position')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {EmployeeDetailOptions.Position}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('Attendance.Department')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {EmployeeDetailOptions.Department}
                </TableCell>

                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {' '}
                  {translate('Attendance.Shift')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {EmployeeDetailOptions.Shift}
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}>
                  {translate('InternalDocument.AttachmentDescription')}:{' '}
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
                  {attachmentDescription}
                </TableCell>
              </TableRow> */}
            </Table>
          </Box>
            </>:<>
            </>
          }
         
        </Box>
      </Card>
    </>
  );
}
