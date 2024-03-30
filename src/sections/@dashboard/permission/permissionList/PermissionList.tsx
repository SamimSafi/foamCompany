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
import PermissionDelete from './PermissionDelete';
import useLocales from 'src/hooks/useLocales';
import PermissionTableToolbar from './PermissionTableToolbar';
import PermissionTableRow from './PermissionTableRow';
import { IPermision, IPermissionParams } from 'src/@types/permission';
import { table } from 'console';

// ----------------------------------------------------------------------

export default observer(function PermissionList() {
  const { translate } = useLocales();
  const { PermissionStore } = useStore();
  const {
    loadPermission,
    permissionList,
    PermisionRegistry,
    totalRecord,
    PermissionSearch,
    getPermissionFromRegistry,
    setOpenCloseDialog,
    openDialog,
  } = PermissionStore;
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
    { id: 'id', label: `${translate('userPermission.Id')}`, align: 'left' },
    { id: 'name', label: `${translate('userPermission.Name')}`, align: 'left' },
    {
      id: 'controller',
      label: `${translate('userPermission.PermissionController')}`,
      align: 'left',
    },
    { id: 'action', label: `${translate('userPermission.Action')}`, align: 'left' },
    { id: 'method', label: `${translate('userPermission.Method')}`, align: 'left' },
    { id: 'application', label: `${translate('userPermission.Application')}`, align: 'left' },
  ];

  const { themeStretch, tablePagination, onChangePagination } = useSettings();

  const [filterName, setFilterName] = useState('');

  const navigate = useNavigate();

  const [id, setId] = useState<number>(0);

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      PermissionSearch({
        pageIndex: 0,
        pageSize: tablePagination,
        searchBy: filterName,
      });
    } else if (filterName === '') {
      PermissionSearch({ pageIndex: 0, pageSize: tablePagination });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: number) => {
    getPermissionFromRegistry(id);

    navigate(PATH_DASHBOARD.Permission.edit);
  };

  const handleDetail = (id: number) => {
    // loadRoleDetail(id).then(()=>{
    //   navigate(PATH_DASHBOARD.Role.detail);
    // });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadPermission({ pageIndex: newPage, pageSize: tablePagination });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePagination(event.target.value);
    onChangeRowsPerPage(event.target.value);
    let pageZize = parseInt(event.target.value);
    loadPermission({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    onChangeRowsPerPage(tablePagination);
    loadPermission({ pageIndex: 0, pageSize: tablePagination });
  }, [loadPermission, tablePagination]);

  useEffect(() => {
    if (PermisionRegistry.size <= 1) {
      loadPermission({ pageIndex: 0, pageSize: tablePagination });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: permissionList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  // const isNotFound = !dataFiltered.length && !!filterName;
  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title="Permission: Permission List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('userPermission.PermissionList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('userRole.Permission')}`,
              href: PATH_DASHBOARD.Permission.root,
            },
            { name: `${translate('userPermission.PermissionList')}` },
          ]}
          // action={
          //   <Button
          //     variant="contained"
          //     startIcon={<Iconify icon="eva:plus-fill" />}
          //     component={RouterLink}
          //     to={PATH_DASHBOARD.Permission.new}
          //   >
          //     {translate('CRUD.Create')}
          //   </Button>
          // }
        />

        <Card>
          <PermissionTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <PermissionTableRow
                        index={index}
                        key={row.id}
                        row={row}
                        onDeleteRow={() => handleOpenConfirm(row.id!)}
                        onEditRow={() => handleEditRow(row.id!)}
                        onDetailRow={() => handleDetail(row.id!)}
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
              <PermissionDelete id={id} />
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
  );
});

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
}: {
  tableData: IPermision[];
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
