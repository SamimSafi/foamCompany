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
import ExpenseTypeNewEditForm from './ExpenseNewEditForm';
import React from 'react';
import ExpenseNewEditForm from './ExpenseNewEditForm';
// sections

// @type

// ----------------------------------------------------------------------

export default function ExpenseCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={!isEdit ? `${translate('Expense.AddTitle')}` : `${translate('Expense.UpdateTitle')}`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('Expense.CreateExpense')}`
              : `${translate('Expense.EditExpense')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Expense.ExpenseList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit ? `${translate('Expense.New')}` : `${translate('Expense.Update')}`,
            },
          ]}
        />
        <ExpenseNewEditForm />
      </Container>
    </Page>
  );
}
