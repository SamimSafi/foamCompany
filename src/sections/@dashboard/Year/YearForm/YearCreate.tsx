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

// @type
import { YearInterface } from '../../../../@types/Year';
import YearNewEditForm from './yearNewEditForm';

// ----------------------------------------------------------------------

export default function YearCreate() {
  const { themeStretch } = useSettings();
  const {translate} = useLocales();
  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page title={translate('Year.CreateTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? `${translate('Year.NewYear')}` : `${translate('Year.UpdateYear')}`}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Year.YearShamsi')}`, href: PATH_DASHBOARD.Year.list },
            { name: !isEdit ? `${translate('Year.NewYear')}` : `${translate('Year.UpdateYear')}` },
          ]}
        />
        <YearNewEditForm />
      </Container>
    </Page>
  );
}
