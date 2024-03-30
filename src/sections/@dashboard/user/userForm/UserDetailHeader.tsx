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
import UserDetailTableRow from '../userList/UserDetailTableRow';
import { useEffect, useState } from 'react';
import { userDetail } from 'src/@types/createUser';
import agent from 'src/api/agent';
import useLocales from '../../../../hooks/useLocales';
import { useParams } from 'react-router';
import Loader from 'src/components/loader/Loader';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'userName', label: 'User Name', align: 'left' },
  { id: 'phoneNumber', label: 'Phone Number', align: 'left' },
  { id: 'eamil', label: 'Email', align: 'left' },
];

export default observer(function UserDetailHeader() {
  const { translate } = useLocales();
  const {
    UserStore: { SelecteduserDetail, clearSelectedUserDetail, clearSelectedUser },
    UserStore,
  } = useStore();

  const { getUserFromRegistry, loadUserDetail } = UserStore;

  const { id } = useParams();

  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (id != null) {
      // loadInternalDocumentDetail(id);
      getUserFromRegistry(id);
      loadUserDetail(id).then(() => {
        setIsloading(true);
        setTimeout(() => {
          setIsloading(true);
        }, 1000);
      });
    } else {
      setIsloading(true);
    }
  }, [id]);

  // useEffect(() => {
  //   if (selectedUser?.id)
  // }, [selectedUser?.id]);

  const { themeStretch } = useSettings();

  return (
    <Page title={translate('User.UserDetails')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('User.UserDetails')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('User.user')}`, href: PATH_DASHBOARD.user.list },
          ]}
        />
        {isloading ? (
          <UserDetailTableRow
            row={SelecteduserDetail!}
            clearUser={clearSelectedUser}
            clearUserDetail={clearSelectedUserDetail}
          />
        ) : (
          <Loader></Loader>
        )}
      </Container>
    </Page>
  );
});
