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
import { useEffect, useState } from 'react';
import { userDetail } from 'src/@types/createUser';
import agent from 'src/api/agent';
import useLocales from '../../../../hooks/useLocales';
import { CustomerDetailTableRow } from '../CustomerList';
// ----------------------------------------------------------------------

export default observer(function CustomerDetailHeader() {
  const { translate } = useLocales();
  const {
    EmployeeStore: { SelectedEmployeeDetail, clearSelectedEmployee },
  } = useStore();

  const { themeStretch } = useSettings();

  return (
    <Page title={translate('Employee.DetailsTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('Employee.EmployeeDetails')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Employee.Employee')}`, href: PATH_DASHBOARD.Employee.list },
          ]}
        />
        <CustomerDetailTableRow
          row={SelectedEmployeeDetail!}
          clearEmployee={clearSelectedEmployee}
        />
      </Container>
    </Page>
  );
});
