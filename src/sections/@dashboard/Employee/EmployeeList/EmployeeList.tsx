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
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';

import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';
// @types

// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../../../components/table';
// sections

import { useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import MyDialog from 'src/components/MyDialog';
import StatusDelete from './EmployeeDelete';
import { IEmployee } from 'src/@types/foamCompanyTypes/Employee';

import EmployeeTableRow from './EmployeeTableRow';
import EmployeeTableToolbar from './EmployeeTableToolbar';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
import useLocalStorage from 'src/hooks/useLocalStorage';
import EmployeeDetails from '../../employeeAttendance/EmployeeDetails';

// ----------------------------------------------------------------------

export default observer(function EmployeeList() {
  const { EmployeeStore, ContractDetailsStore } =
    useStore();
  const { translate } = useLocales();
  const {
    loadEmployee,
    EmployeeList,
    EmployeeRegistry,
    totalRecord,
    EmployeeSearch,
    deleteEmployee,
    getEmployeeFromRegistry,
    setOpenCloseDialog,
    openDialog,
    getEmpForEdit,
    clearSelectedEmployee,
    loadEmployeeDetail,
    selectedEmployee,
  } = EmployeeStore;
  const { loadContractDetails, getEmpCurrentContract,ContractDetailsRegistry } = ContractDetailsStore;

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

  const [EmployeeId, setEmployeeId] = useState<number>(0);
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('Employee.Id')}`, align: 'left' },
    { id: 'fullName', label: `${translate('Employee.Name')}`, align: 'left' },
    { id: 'departmentName', label: `${translate('Employee.Department')}`, align: 'left' },
    { id: 'personalEmail', label: `${translate('Employee.Email')}`, align: 'left' },
    { id: 'phoneNumber', label: `${translate('Employee.PhoneNumber')}`, align: 'left' },

    { id: '', label: `${translate('Department.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      EmployeeSearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        searchBy: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      EmployeeSearch({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setEmployeeId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: number) => {
    getEmpForEdit(id).then((res) => {
      navigate(PATH_DASHBOARD.Employee.edit);
    });
  };

  const handleCreateUser = (id: number) => {
    getEmployeeFromRegistry(id);

    navigate(PATH_DASHBOARD.user.new);
  };

  const handleDetail = (id: number) => {
    loadEmployeeDetail(id).then(() => {
      navigate(PATH_DASHBOARD.Employee.detail);
    });
  };

  const StoreIDToLocalStorage = (id: any, storeName: any) => {
    localStorage.removeItem('id');
    localStorage.setItem('id', JSON.stringify(id));
    const getEmployeeIdFromLocalStorage = localStorage.getItem('id');
    const EmployeeID = JSON.parse(getEmployeeIdFromLocalStorage!);
    storeName.ID = EmployeeID;
  };

  const handleCardDetails = (id: number) => {
    if (id) {
      // StoreIDToLocalStorage(id, CardDetailsStore);
      getEmployeeFromRegistry(id);
      navigate(PATH_DASHBOARD.ContractDetails.list);
    }
  };

  const handleContractDetails = (id: number) => {
    ContractDetailsRegistry.clear();
    if (id) {
      //StoreIDToLocalStorage(id, ContractDetailsStore);
      getEmployeeFromRegistry(id);
      getEmpCurrentContract(id);
      loadContractDetails({ pageIndex: 0, pageSize: rowsPerPage }, id);
      navigate(PATH_DASHBOARD.ContractDetails.list);
    }
  };

  // Employee Detail
  const employeeDetails = (id: number) => {
    loadEmployeeDetail(id).then(() => {
      navigate(PATH_DASHBOARD.Employee.detail);
    });
  };

  const handleEducationalLevelDetails = (id: any) => {
    getEmployeeFromRegistry(id);
    navigate(PATH_DASHBOARD.ContractDetails.list);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadEmployee({ pageIndex: newPage, pageSize: rowsPerPage });
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loadEmployee({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    if (EmployeeRegistry.length <= 1) {
      loadEmployee({ pageIndex: 0, pageSize: rowsPerPage });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: EmployeeList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('Employee.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('Employee.EmployeeList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            { name: `${translate('Employee.EmployeeList')}` },
          ]}
          action={
            <>
              <PermissionBasedGuard permissions={['Employee-Create']}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  component={RouterLink}
                  to={PATH_DASHBOARD.Employee.new}
                >
                  {translate('CRUD.Create')}
                </Button>
              </PermissionBasedGuard>
            </>
          }
        />

        <Card>
          <EmployeeTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <EmployeeTableRow
                        key={row.id}
                        index={index}
                        row={row}
                        onDeleteRow={() => handleOpenConfirm(row.id!)}
                        onEditRow={() => handleEditRow(row.id!)}
                        onCreateUser={() => handleCreateUser(row.id!)}
                        onCardDetails={() => handleCardDetails(row.id!)}
                        onContractDetails={() => handleContractDetails(row.id!)}
                        onEducationalLevelDetails={() => handleEducationalLevelDetails(row.id!)}
                        handleDetail={() => handleDetail(row.id!)}
                        doubleClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          if (e.detail == 2) {
                            employeeDetails(row.id!);
                          }
                        }}
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
              <StatusDelete id={EmployeeId} />
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
  tableData: IEmployee[];
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
