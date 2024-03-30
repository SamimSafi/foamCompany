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
import { useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import MyDialog from 'src/components/MyDialog';
import StatusDelete from './ContractDetailsDelete';
import { IContractDetails } from 'src/@types/foamCompanyTypes/ContractDetails';
import ContractDetailsTableRow from './ContractDetailsTableRow';
import ContractDetailsTableToolbar from './ContractDetailsTableToolbar';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
import useLocalStorage from 'src/hooks/useLocalStorage';
import Typography from 'src/theme/overrides/Typography';

// ----------------------------------------------------------------------

export default observer(function ContractDetailsList() {
  const {
    ContractDetailsStore,
    EmployeeStore: { selectedEmployee },
  } = useStore();
  const { translate } = useLocales();
  const {
    loadContractDetails,
    ContractDetailsList,
    ContractDetailsRegistry,
    totalRecord,
    ContractDetailsSearch,
    deleteContractDetails,
    getContractDetailsFromRegistry,
    setOpenCloseDialog,
    openDialog,
    ID,
    clearSelectedContractDetails,
    getEmpCurrentContract,
  } = ContractDetailsStore;
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

  const [EmpData] = useLocalStorage('DetailsData', null);

  const { enqueueSnackbar } = useSnackbar();

  const [ContractDetailsId, setContractDetailsId] = useState<number>(0);
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('Employee.Id')}`, align: 'left' },
    // { id: 'employeeName', label: `${translate('Employee.Name')}`, align: 'left' },
    { id: 'contractType', label: `${translate('ContractType.ContractType')}`, align: 'left' },
     { id: 'branchName', label: `${translate('branch.branchName')}`, align: 'left' },
    { id: 'positionTitle', label: `${translate('PositionTitle.PositionTitle')}`, align: 'left' },
    { id: 'salaryPerHour', label: `${translate('ContractType.salaryPerHour')}`, align: 'left' },
    { id: 'startDate', label: `${translate('GeneralFields.StartDate')}`, align: 'left' },
    { id: 'endDate', label: `${translate('GeneralFields.EndDate')}`, align: 'left' },
    { id: 'isCurrent', label: `${translate('ContractType.ContractStatus')}`, align: 'left' },
    { id: '', label: `${translate('Department.Action')}`, align: 'left' },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    console.log(filterName);
    if (filterName.length > 1) {
      ContractDetailsSearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        searchBy: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      ContractDetailsSearch({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setContractDetailsId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: number) => {
    getContractDetailsFromRegistry(id);

    navigate(PATH_DASHBOARD.ContractDetails.edit);
  };

  // const handleDelete = () => {
  //   deleteContractDetails(ContractDetailsId)
  //     .then(() => {
  //       setOpenConfirm(false);
  //       enqueueSnackbar('Delete  success!');
  //       setContractDetailsId(0);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       enqueueSnackbar(`${translate('Tostar.DeleteFailed')}`, {
  //         variant: 'error',
  //       });
  //       setOpenConfirm(false);
  //       setContractDetailsId(0);
  //     });
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    loadContractDetails({ pageIndex: newPage, pageSize: rowsPerPage }, ID);
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loadContractDetails({ pageIndex: 0, pageSize: pageZize }, ID);
  };
  useEffect(() => {
    loadContractDetails({ pageIndex: 0, pageSize: rowsPerPage }, EmpData.id);
  }, [ID]);

  const dataFiltered = applySortFilter({
    tableData: ContractDetailsList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('ContractDetails.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            EmpData?.name +
            ' ' +
            EmpData?.surName +
            ' - ' +
            translate('ContractDetails.ContractDetailsList')
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Employee.EmployeeList')}`, href: PATH_DASHBOARD.Employee.list },
            { name: `${translate('ContractDetails.ContractDetailsList')}` },
          ]}
          action={
            <>
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.Employee.list}
                onClick={() => {
                  clearSelectedContractDetails();
                }}
              >
                {translate('CRUD.BackToEmployee')}
              </Button>
              <PermissionBasedGuard permissions={['ContractDetails-Create']}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  component={RouterLink}
                  to={PATH_DASHBOARD.ContractDetails.new}
                  onClick={() => {
                    getEmpCurrentContract(EmpData.id);
                  }}
                >
                  {translate('CRUD.Create')}
                </Button>
              </PermissionBasedGuard>
            </>
          }
        />

        <Card>
          <ContractDetailsTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <ContractDetailsTableRow
                        key={row.id}
                        row={row}
                        index={index}
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
              <StatusDelete id={ContractDetailsId} />
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
  tableData: IContractDetails[];
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
