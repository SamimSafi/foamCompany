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
// @types
import { IRole } from '../../../../@types/role';

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
import RoleDelete from './RoleDelete';
import useLocales from 'src/hooks/useLocales'; //Localization
import RoleTableToolbar from './RoleTableToolbar';
import RoleTableRow from './RoleTableRow';
import { table } from 'console';

// ----------------------------------------------------------------------

export default observer(function RoleList() {
  const { translate } = useLocales(); //Localization
  const { RoleStore } = useStore();
  const {
    loadRole,
    loadRoleDetail,
    roleList,
    RoleRegistry,
    totalRecord,
    RoleSearch,
    getRoleFromRegistry,
    setOpenCloseDialog,
    openDialog,
  } = RoleStore;
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
    { id: 'id', label: `${translate('userRole.Id')}`, align: 'left' },
    { id: 'Application', label: `${translate('userRole.Application')}`, align: 'left' },
    { id: 'name', label: `${translate('userRole.Name')}`, align: 'left' },
    { id: 'description', label: `${translate('userRole.Description')}`, align: 'left' },
    { id: 'totalPermissions', label: `${translate('userRole.TotalPermissions')}`, align: 'left' },
    { id: '', label: `${translate('Department.Action')}` },
  ];

  const { themeStretch, tablePagination, onChangePagination } = useSettings();

  const [filterName, setFilterName] = useState('');

  const navigate = useNavigate();

  const [id, setId] = useState<number>(0);

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      RoleSearch({
        pageIndex: 0,
        pageSize: tablePagination,
        searchBy: filterName,
      });
    } else if (filterName === '') {
      RoleSearch({ pageIndex: 0, pageSize: tablePagination });
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
    getRoleFromRegistry(id);
    loadRoleDetail(id).then(() => {
      navigate(PATH_DASHBOARD.Role.edit);
    });
  };

  const handleDetail = (id: number) => {
    loadRoleDetail(id).then(() => {
      navigate(PATH_DASHBOARD.Role.detail);
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadRole({ pageIndex: newPage, pageSize: tablePagination });
    console.log('Page Changed');
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePagination(event.target.value);
    onChangeRowsPerPage(event.target.value);
    let pageZize = parseInt(event.target.value);
    loadRole({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    onChangeRowsPerPage(tablePagination);
    loadRole({ pageIndex: 0, pageSize: tablePagination });
  }, [loadRole, tablePagination]);
  useEffect(() => {
    if (RoleRegistry.size <= 1) {
      loadRole({ pageIndex: 0, pageSize: tablePagination });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: roleList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  // const isNotFound = !dataFiltered.length && !!filterName;
  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('userRole.RoleList')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('userRole.RoleList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('userRole.Role')}`,
              href: PATH_DASHBOARD.Role.root,
            },
            { name: `${translate('userRole.RoleList')}` },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.Role.new}
            >
              {translate('CRUD.Create')}
            </Button>
          }
        />

        <Card>
          <RoleTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <RoleTableRow
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
              <RoleDelete id={id} />
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
  tableData: IRole[];
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
