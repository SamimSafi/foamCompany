// @mui
import { Container } from '@mui/material';

import { observer } from 'mobx-react-lite';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/routes/paths';
import PermissionFrom from './permissionForm/PermissionFrom';

export default observer(function Permission() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Permissions">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Permission"
          links={[{ name: 'Permission', href: PATH_DASHBOARD.root }]}
        />

        <PermissionFrom />
      </Container>
    </Page>
  );
});
