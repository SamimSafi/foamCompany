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
import ContractTypeNewEditForm from './BranchNewEditForm';
import BranchNewEditForm from './BranchNewEditForm';
// sections

// @type

// ----------------------------------------------------------------------

export default function BranchCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('Branch.AddTitle')}`
          : `${translate('Branch.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('Branch.CreateBranch')}`
              : `${translate('Branch.EditBranch')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Branch.BranchList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit
                ? `${translate('Branch.New')}`
                : `${translate('Branch.Update')}`,
            },
          ]}
        />
        <BranchNewEditForm />
      </Container>
    </Page>
  );
}
