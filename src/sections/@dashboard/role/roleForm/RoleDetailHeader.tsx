// @mui
import { Card, Container, Grid, TableBody, TableContainer } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableHeadCustom } from 'src/components/table';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import RoleDetailTableRow from '../roleList/RoleDetailTableRow';
//Localization
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------


export default observer(function RoleDetailHeader() {
  const { translate } = useLocales();
  const {
    RoleStore: { selectedRoleDetail,clearSelectedRole },
  } = useStore();

  const { themeStretch } = useSettings();
  return (
    <Page title={translate('userRole.RoleDetails')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('userRole.RoleDetails')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('userRole.Role')}`, href: PATH_DASHBOARD.Role.list },
          ]}
        />
        <Grid container>
                <RoleDetailTableRow row={selectedRoleDetail!} clearRole={clearSelectedRole}/>
        
        </Grid>
      </Container>
    </Page>
  );
});
