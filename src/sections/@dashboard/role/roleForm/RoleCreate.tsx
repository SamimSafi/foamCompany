import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import RoleNewEditForm from './RoleNewEditForm';
//Localization
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------

export default function RoleCreate() {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page title={translate('userRole.CreateNewRole')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? `${translate('userRole.CreateNewRole')}` : `${translate('userRole.EditRole')}`}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('userRole.Role')}`, href: PATH_DASHBOARD.Role.list },
            { name: !isEdit ? `${translate('userRole.NewRole')}` : `${translate('userRole.RoleEdit')}` },
          ]}
        />
        <RoleNewEditForm />
      </Container>
    </Page>
  );
}
