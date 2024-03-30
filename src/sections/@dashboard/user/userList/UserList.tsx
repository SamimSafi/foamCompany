import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Switch,
  Button,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
  CircularProgress,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';

// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../../../components/table';
// sections
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import MyDialog from 'src/components/MyDialog';

import useLocales from 'src/hooks/useLocales';
import UserTableToolbar from './UserTableToolbar';
import UserTableRow from './UserTableRow';
import { CreateUser } from 'src/@types/createUser';
import UserDelete from './UserDelete';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from 'src/sections/@dashboard/user/userList/InvoicePDF';
import { delay } from 'lodash';
import DownloadIcon from '@mui/icons-material/Download';
import { table } from 'console';
// ----------------------------------------------------------------------

export default observer(function UserList() {
  const { translate } = useLocales();
  const { UserStore } = useStore();
  const {
    loadUser,
    loadUserDetail,
    userList,
    userResponse,
    UserRegistry,
    totalRecord,
    clearUserInfo,
    UserSearch,
    getUserFromRegistry,
    setOpenCloseDialog,
    openDialog,
  } = UserStore;
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangeDense,
    onChangeRowsPerPage,
  } = useTable();
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('Department.Id')}`, align: 'left' },
    { id: 'userName', label: `${translate('User.userName')}`, align: 'left' },
    { id: 'email', label: `${translate('User.email')}`, align: 'left' },
    { id: 'empName', label: `${translate('User.Employee')}`, align: 'left' },
    { id: '', label: `${translate('Department.Action')}` },
  ];

  const { themeStretch, tablePagination, onChangePagination } = useSettings();

  const [filterName, setFilterName] = useState('');

  const navigate = useNavigate();

  const [id, setId] = useState<string>('');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      UserSearch({
        pageIndex: 0,
        pageSize: tablePagination,
        searchBy: filterName,
      });
    } else if (filterName === '') {
      UserSearch({ pageIndex: 0, pageSize: tablePagination });
    }
  };

  const handleOpenConfirm = (id: string) => {
    setOpenCloseDialog();
    setId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: string) => {
    getUserFromRegistry(id);
    loadUserDetail(id).then((res) => {
      navigate(PATH_DASHBOARD.user.edit);
    });
    clearUserInfo();
  };

  const handlePasswordReset = (id: string) => {
    getUserFromRegistry(id);
    clearUserInfo();
    navigate(PATH_DASHBOARD.user.resetPassword);
  };

  const handleDetail = (id: string) => {
    getUserFromRegistry(id);
    clearUserInfo();
    loadUserDetail(id).then(() => {
      navigate(PATH_DASHBOARD.user.detail(id));
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadUser({ pageIndex: newPage, pageSize: tablePagination });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePagination(event.target.value);
    onChangeRowsPerPage(event.target.value);
    let pageZize = parseInt(event.target.value);
    loadUser({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    onChangeRowsPerPage(tablePagination);
    loadUser({ pageIndex: 0, pageSize: tablePagination });
  }, [loadUser, tablePagination]);

  useEffect(() => {
    if (UserRegistry.size <= 1) {
      loadUser({ pageIndex: 0, pageSize: rowsPerPage });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: userList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });
  const handelClearInfo = () => {
    setTimeout(() => {
      clearUserInfo();
    }, 2000);
  };

  const denseHeight = dense ? 52 : 72;

  // const isNotFound = !dataFiltered.length && !!filterName;
  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Page title={translate('User.Title')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={translate('User.userList')}
            links={[
              { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
              {
                name: `${translate('User.user')}`,
                href: PATH_DASHBOARD.user.root,
              },
              { name: `${translate('User.userList')}` },
            ]}
            action={
              <>
                {userResponse?.data.userName && (
                  <PDFDownloadLink
                    document={<InvoicePDF invoice={userResponse} />}
                    fileName={'User Password'}
                    style={{ textDecoration: 'none', marginRight: 12 }}
                  >
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<DownloadIcon />}
                      onClick={() => handelClearInfo()}
                      sx={{ mr: 1 }}
                    >
                      <Stack direction="row">{translate('User.userPassword')}</Stack>
                    </Button>
                  </PDFDownloadLink>
                )}

                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  component={RouterLink}
                  to={PATH_DASHBOARD.user.new}
                >
                  {translate('CRUD.Create')}
                </Button>
              </>
            }
          />
          <Card>
            <UserTableToolbar filterName={filterName} onFilterName={handleFilterName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
                <Table size={dense ? 'small' : 'medium'}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={totalRecord}
                    onSort={onSort}
                  />

                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <UserTableRow
                          key={row.id}
                          row={row}
                          index={index}
                          onDeleteRow={() => handleOpenConfirm(row.id!)}
                          onEditRow={() => handleEditRow(row.id!)}
                          onDetailRow={() => handleDetail(row.id!)}
                          onPasswordReset={() => handlePasswordReset(row.id!)}
                        />
                      ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, totalRecord)}
                    />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Box sx={{ position: 'relative' }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200]}
                component="div"
                count={totalRecord}
                labelRowsPerPage={translate('Pagination.RowsPerPage')}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} ${translate('Pagination.Of')} ${count}`
                }
                rowsPerPage={tablePagination}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handlePageSizeChange}
              />
              <MyDialog
                open={openDialog}
                onClose={handleCloseConfirm}
                title={translate('CRUD.DeleteTitle')}
                size="md"
              >
                <UserDelete id={id} />
              </MyDialog>

              <FormControlLabel
                control={<Switch checked={dense} onChange={onChangeDense} />}
                label={translate('Pagination.Dense')}
                sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
              />
            </Box>
          </Card>
        </Container>
      </Page>
    </>
  );
});

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
}: {
  tableData: CreateUser[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.searchBy.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
