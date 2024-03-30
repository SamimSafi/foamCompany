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
import useLocales from 'src/hooks/useLocales';
import DistrictNewEditForm from './DistrictNewEditForm';
// ----------------------------------------------------------------------

export default function DistrictCreate() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page title= {!isEdit ? `${translate('District.AddTitle')}` : `${translate('District.UpdateTitle')}`} >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('District.CreateNewDistrict')}`
              : `${translate('District.UpdateDistrict')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('District.District')}`, href: PATH_DASHBOARD.district.list },
            {
              name: !isEdit
                ? `${translate('District.CreateNewDistrict')}`
                : `${translate('District.UpdateDistrict')}`,
            },
          ]}
        />
        <DistrictNewEditForm />
      </Container>
    </Page>
  );
}
