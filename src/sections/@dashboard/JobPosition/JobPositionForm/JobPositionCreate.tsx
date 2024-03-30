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
import JobPositionNewEditForm from './JobPositionNewEditForm';
// ----------------------------------------------------------------------

export default function JobPositionCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit ? `${translate('JobPosition.AddTitle')}` : `${translate('JobPosition.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('JobPosition.CreateJobPosition')}`
              : `${translate('JobPosition.EditJobPosition')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('JobPosition.JobPositionList')}`,
              href: PATH_DASHBOARD.JobPosition.list,
            },
            {
              name: !isEdit
                ? `${translate('JobPosition.New')}`
                : `${translate('JobPosition.Update')}`,
            },
          ]}
        />
        <JobPositionNewEditForm />
      </Container>
    </Page>
  );
}
