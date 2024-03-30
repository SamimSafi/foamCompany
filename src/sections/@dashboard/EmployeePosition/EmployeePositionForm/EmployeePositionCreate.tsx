import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useLocales from 'src/hooks/useLocales';
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import EmployeePositionNewEditForm from './EmployeePositionNewEditForm';
// ----------------------------------------------------------------------

export default function EmployeePositionCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page title={translate('EmployeePosition.CreateTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? `${translate('EmployeePosition.CreateEmployeePosition')}` : `${translate('EmployeePosition.EditEmployeePosition')}`}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('EmployeePosition.EmployeePositionList')}`, href: PATH_DASHBOARD.EmployeePositions.list },
            { name: !isEdit ? `${translate('EmployeePosition.NewEmployeePosition')}` : `${translate('EmployeePosition.UpdateEmployeePosition')}` },
          ]}
        />
        <EmployeePositionNewEditForm />
      </Container>
    </Page>
  );
}
