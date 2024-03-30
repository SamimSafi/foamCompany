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
import ContractDetailsNewEditForm from './ContractDetailsNewEditForm';
import { useStore } from 'src/stores/store';
import useLocalStorage from 'src/hooks/useLocalStorage';
// ----------------------------------------------------------------------

export default function ContractDetailsCreate() {
  const { themeStretch } = useSettings();
  const [EmpData] = useLocalStorage('DetailsData', null);
  const {
    EmployeeStore: { selectedEmployee },
  } = useStore();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('ContractDetails.AddTitle')}`
          : `${translate('ContractDetails.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? EmpData?.name +
                ' ' +
                EmpData?.surName +
                ' - ' +
                `${translate('ContractDetails.CreateContractDetails')}`
              : EmpData?.name +
                ' ' +
                EmpData?.surName +
                ' - ' +
                `${translate('ContractDetails.EditContractDetails')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('ContractDetails.ContractDetailsList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit
                ? `${translate('ContractDetails.New')}`
                : `${translate('ContractDetails.Update')}`,
            },
          ]}
        />
        <ContractDetailsNewEditForm />
      </Container>
    </Page>
  );
}
