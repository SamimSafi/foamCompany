import { useEffect, useState } from 'react';
import useLocales from 'src/hooks/useLocales';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../../../components/table';
import { useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import MyDialog from 'src/components/MyDialog';
import { IUnitOfMeasure } from 'src/@types/foamCompanyTypes/unitOfMeasure';
import MeasurementTableToolbar from './MeasurementTableToolbar';
import { ContractTypeTableRow } from '../../ContractType/ContractTypeList';
import MeasurementDelete from './MeasurementDelete';
import MeasurementTableRow from './MeasurementTableRow';

// ----------------------------------------------------------------------

export default observer(function MeasurementList() {
  const { uniteOfMeasureStore } = useStore();
  const { translate } = useLocales();
  const {
    loaduniteOfMeasure,
    uniteOfMeasureList,
    uniteOfMeasureRegistry,
    totalRecord,
    uniteOfMeasureearch,
    getuniteOfMeasureFromRegistry,
    setOpenCloseDialog,
    openDialog,
  } = uniteOfMeasureStore;
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

  const [filterName, setFilterName] = useState(''); //State For Search

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [ContractTypeId, setContractTypeId] = useState<number>(0);
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('GeneralFields.Id')}`, align: 'left' },
    { id: 'name', label: `${translate('GeneralFields.Name')}`, align: 'left' },
    { id: '', label: `${translate('GeneralFields.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      uniteOfMeasureearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        name: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      uniteOfMeasureearch({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setContractTypeId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: number) => {
    getuniteOfMeasureFromRegistry(id);
    navigate(PATH_DASHBOARD.ContractType.edit);
  };

  // const handleDelete = () => {
  //   deleteConstructionType(ConstructionTypeId)
  //     .then(() => {
  //       setOpenConfirm(false);
  //       enqueueSnackbar('Delete  success!');
  //       setConstructionTypeId(0);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       enqueueSnackbar(`${translate('Tostar.DeleteFailed')}`, {
  //         variant: 'error',
  //       });
  //       setOpenConfirm(false);
  //       setConstructionTypeId(0);
  //     });
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loaduniteOfMeasure({ pageIndex: newPage, pageSize: rowsPerPage });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loaduniteOfMeasure({ pageIndex: 0, pageSize: pageZize });
  };
  useEffect(() => {
    if (uniteOfMeasureRegistry.size <= 1) {
      loaduniteOfMeasure({ pageIndex: 0, pageSize: rowsPerPage });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: uniteOfMeasureList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('UniteOfMeasure.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('UniteOfMeasure.uniteOfMeasureList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            { name: `${translate('UniteOfMeasure.uniteOfMeasureList')}` },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.ContractType.new}
            >
              {translate('CRUD.Create')}
            </Button>
          }
        />

        <Card>
          <MeasurementTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <MeasurementTableRow
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
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
              <MeasurementDelete id={ContractTypeId} />
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
  tableData: IUnitOfMeasure[];
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
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
