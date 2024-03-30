import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// @mui
import {
  Box,
  Stack,
  Dialog,
  Tooltip,
  IconButton,
  DialogActions,
  CircularProgress,
  useTheme,
} from '@mui/material';
// hooks
import useToggle from 'src/hooks/useToggle';

// components
import Iconify from 'src/components/Iconify';
//localization
import useLocales from 'src/hooks/useLocales';
import { AttendanceReportResult } from 'src/@types/attendanceReport';
import AttendanceReportPDF from './AttendanceReportPDF';
import { themeMode } from 'src/utils/general';

// ----------------------------------------------------------------------

type Props = {
  AttendanceReportResult: AttendanceReportResult[];
};

export default function AttendanceDetailsToolbar({ AttendanceReportResult }: Props) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggle: open, onOpen, onClose } = useToggle();

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ borderRadius: 1, ml: 1 }}>
        <>
          <Tooltip title={translate('Attendance.View')}>
            <IconButton
              onClick={onOpen}
              sx={{ color: themeMode() === 'light' ? 'black' : 'white' }}
              size="medium"
            >
              <Iconify icon={'eva:eye-fill'} />
            </IconButton>
          </Tooltip>
          <PDFDownloadLink
            document={<AttendanceReportPDF AttendanceReportResult={AttendanceReportResult} />}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title={translate('Attendance.Download')}>
                <IconButton
                  sx={{ color: themeMode() === 'light' ? 'black' : 'white' }}
                  size="medium"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Iconify icon={'eva:download-fill'} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>
        </>
      </Stack>

      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={onClose}>
                <Iconify icon={'eva:close-fill'} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <AttendanceReportPDF AttendanceReportResult={AttendanceReportResult} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
