import { useEffect, useState } from 'react';
import useLocales from 'src/hooks/useLocales';
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
import { ProcessStatusTableToolbar } from '.';
import { ProcessStatusTableRow } from '.';
import { useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import MyDialog from 'src/components/MyDialog';
import StatusDelete from './EmployeePositionDelete';
import EmployeePositionDelete from './EmployeePositionDelete';
import EmployeePositionTableRow from './EmployeePositionTableRow';
import EmployeePositionTableToolbar from './EmployeePositionTableToolbar';
import { IEmployeePosition } from 'src/@types/EmployeePosition';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';

// ----------------------------------------------------------------------

export default observer(function ProcessStatusList() {
  const { EmployeePositionStore } = useStore();
  const { translate } = useLocales();
  const {
    loadEmployeePosition,
    EmployeePositionList,
    EmployeePositionRegistry,
    totalRecord,
    EmployeePositionSearch,
    deleteEmployeePosition,
    getEmployeePositionFromRegistry,
    setOpenCloseDialog,
    openDialog,
  } = EmployeePositionStore;
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

  const { themeStretch } = useSettings();

  const [filterName, setFilterName] = useState('');

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [EmployeePositionId, setEmployeePositionId] = useState<number>(0);
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('Employee.Id')}`, align: 'left' },
    { id: 'englishName', label: `${translate('Employee.EnglishName')}`, align: 'left' },
    { id: 'pashtoName', label: `${translate('Employee.PashtoName')}`, align: 'left' },
    { id: 'dariName', label: `${translate('Employee.DariName')}`, align: 'left' },
    { id: 'code', label: `${translate('Department.DocCode')}`, align: 'left' },
    { id: '', label: `${translate('Department.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      EmployeePositionSearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        name: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      EmployeePositionSearch({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setEmployeePositionId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: number) => {
    getEmployeePositionFromRegistry(id);
    navigate(PATH_DASHBOARD.EmployeePositions.edit);
  };

  // const handleDelete = () => {
  //   deleteEmployeePosition(EmployeePositionId)
  //     .then(() => {
  //       setOpenConfirm(false);
  //       enqueueSnackbar('Delete  success!');
  //       setEmployeePositionId(0);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       enqueueSnackbar(`${translate('Tostar.DeleteFailed')}`, {
  //         variant: 'error',
  //       });
  //       setOpenConfirm(false);
  //       setEmployeePositionId(0);
  //     });
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadEmployeePosition({ pageIndex: newPage, pageSize: rowsPerPage });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loadEmployeePosition({ pageIndex: 0, pageSize: pageZize });
  };
  useEffect(() => {
    if (EmployeePositionRegistry.size <= 1) {
      loadEmployeePosition({ pageIndex: 0, pageSize: rowsPerPage });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: EmployeePositionList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('EmployeePosition.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('EmployeePosition.EmployeePositionList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            { name: `${translate('EmployeePosition.EmployeePositionList')}` },
          ]}
          action={
            <>
              <PermissionBasedGuard permissions={['EmployeePosition-Create']}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  component={RouterLink}
                  to={PATH_DASHBOARD.EmployeePositions.new}
                >
                  {translate('CRUD.Create')}
                </Button>
              </PermissionBasedGuard>
            </>
          }
        />

        <Card>
          <EmployeePositionTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                    .map((row) => (
                      <EmployeePositionTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => handleOpenConfirm(row.id!)}
                        onEditRow={() => handleEditRow(row.id!)}
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
              labelRowsPerPage={translate('Pagination.RowsPerPage')}
              count={totalRecord}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${translate('Pagination.Of')} ${count}`
              }
              rowsPerPage={rowsPerPage}
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
              <EmployeePositionDelete id={EmployeePositionId} />
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
  tableData: IEmployeePosition[];
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
