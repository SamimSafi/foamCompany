import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useLocales from 'src/hooks/useLocales';
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import LanguageNewEditForm from './LanguageNewEditForm';


// ----------------------------------------------------------------------

export default function LanguageCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page title="Language: Create a new Language">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? `${translate('Language.NewLanguage')}` : `${translate('Language.UpdateLanguage')}`}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Language.Language')}`, href: PATH_DASHBOARD.Language.list },
            { name: !isEdit ? `${translate('Language.NewLanguage')}` : `${translate('Language.UpdateLanguage')}` },
          ]}
        />
        <LanguageNewEditForm />
      </Container>
    </Page>
  );
}
