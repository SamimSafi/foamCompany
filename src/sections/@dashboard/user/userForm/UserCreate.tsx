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
import UserNewEditForm from './UserNewEditForm';
import useLocales from '../../../../hooks/useLocales';
// ----------------------------------------------------------------------

export default function UserCreate() {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page title={translate('User.newUser')} >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? `${translate('User.createUser')}` : `${translate('User.editUser')}`}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('User.user')}`, href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? `${translate('User.newUser')}` : `${translate('User.editUser')}` },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </Page>
  );
}
