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
import ExpenseTypeNewEditForm from './ExpenseTypeNewEditForm';
import React from 'react';
// sections

// @type

// ----------------------------------------------------------------------

export default function ExpenseTypeCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('ExpenseType.AddTitle')}`
          : `${translate('ExpenseType.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('ExpenseType.CreateExpenseType')}`
              : `${translate('ExpenseType.EditExpenseType')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('ExpenseType.ExpenseTypeList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit
                ? `${translate('ExpenseType.New')}`
                : `${translate('ExpenseType.Update')}`,
            },
          ]}
        />
        <ExpenseTypeNewEditForm />
      </Container>
    </Page>
  );
}
