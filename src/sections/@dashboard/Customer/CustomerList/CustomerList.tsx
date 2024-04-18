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
import StatusDelete from './CustomerDelete';
import { IEmployee } from 'src/@types/foamCompanyTypes/Employee';

import EmployeeTableRow from './CustomerTableRow';
import EmployeeTableToolbar from './CustomerTableToolbar';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
import useLocalStorage from 'src/hooks/useLocalStorage';
import EmployeeDetails from '../../employeeAttendance/EmployeeDetails';
import { ICustomer } from 'src/@types/foamCompanyTypes/customer';
import CustomerTableRow from './CustomerTableRow';

// ----------------------------------------------------------------------

export default observer(function CustomerList() {
  const { customerStore, ContractDetailsStore } = useStore();
  const { translate } = useLocales();
  const {
    loadCustomer,
    CustomerList,
    CustomerRegistry,
    totalRecord,
    Customerearch,
    getCustomerFromRegistry,
    setOpenCloseDialog,
    openDialog,
    clearSelectedCustomer,
    selectedCustomer,
  } = customerStore;
  const { loadContractDetails, getEmpCurrentContract, ContractDetailsRegistry } =
    ContractDetailsStore;

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
    { id: 'sureName', label: `${translate('Employee.surName')}`, align: 'left' },
    { id: 'email', label: `${translate('Employee.Email')}`, align: 'left' },
    { id: 'phone', label: `${translate('Employee.PhoneNumber')}`, align: 'left' },
    { id: 'location', label: `${translate('Employee.Location')}`, align: 'left' },

    { id: '', label: `${translate('Department.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      Customerearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        search: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      Customerearch({ pageIndex: 0, pageSize: rowsPerPage });
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
    navigate(PATH_DASHBOARD.Customer.edit);
  };

  const handleCreateUser = (id: number) => {
    getCustomerFromRegistry(id);

    navigate(PATH_DASHBOARD.user.new);
  };

  const handleDetail = (id: number) => {
    // loadCustomerDetail(id).then(() => {
    //   navigate(PATH_DASHBOARD.Employee.detail);
    // });
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
      getCustomerFromRegistry(id);
      navigate(PATH_DASHBOARD.ContractDetails.list);
    }
  };

  const handleContractDetails = (id: number) => {
    ContractDetailsRegistry.clear();
    if (id) {
      //StoreIDToLocalStorage(id, ContractDetailsStore);
      getCustomerFromRegistry(id);
      getEmpCurrentContract(id);
      loadContractDetails({ pageIndex: 0, pageSize: rowsPerPage }, id);
      navigate(PATH_DASHBOARD.ContractDetails.list);
    }
  };

  // Employee Detail
  const employeeDetails = (id: number) => {
    // loadCustomerDetail(id).then(() => {
    //   navigate(PATH_DASHBOARD.Employee.detail);
    // });
  };

  const handleEducationalLevelDetails = (id: any) => {
    getCustomerFromRegistry(id);
    navigate(PATH_DASHBOARD.ContractDetails.list);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadCustomer({ pageIndex: newPage, pageSize: rowsPerPage });
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loadCustomer({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    if (CustomerRegistry.size <= 1) {
      loadCustomer({ pageIndex: 0, pageSize: rowsPerPage });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: CustomerList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('Employee.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('Employee.CustomerList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            { name: `${translate('Employee.CustomerList')}` },
          ]}
          action={
            <>
              <PermissionBasedGuard permissions={['Customer-Create']}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  component={RouterLink}
                  to={PATH_DASHBOARD.Customer.new}
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
                      <CustomerTableRow
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
  tableData: ICustomer[];
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
        item.search.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
