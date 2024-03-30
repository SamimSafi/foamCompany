import { useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';

// components
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
//localization
import useLocales from 'src/hooks/useLocales';
import AttendanceReportsForm from './AttendanceReportsForm';

// ----------------------------------------------------------------------

export default function AttendanceReportIndex() {
  const { translate } = useLocales();

  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  return (
    <Page title={translate('Attendance.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          // heading={!isEdit ? `${translate('InternalDocument.CreateNewInternalDoc')}` : `${translate('InternalDocument.EditInternalDoc')}`}
          heading={translate('Attendance.AttendanceReport')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Attendance.AttendanceReport')}` },
          ]}
        />

        <AttendanceReportsForm />
      </Container>
    </Page>
  );
}
