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
import StatusDelete from './PositionTitleDelete';
import { IPositionTitle } from 'src/@types/foamCompanyTypes/PositionTitle';
import PositionTitleTableRow from './PositionTitleTableRow';
import PositionTitleTableToolbar from './PositionTitleTableToolbar';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';

// ----------------------------------------------------------------------

export default observer(function PositionTitleList() {
  const { PositionTitleStore } = useStore();
  const { translate } = useLocales();
  const {
    loadPositionTitle,
    PositionTitleList,
    PositionTitleRegistry,
    totalRecord,
    PositionTitleSearch,
    deletePositionTitle,
    getPositionTitleFromRegistry,
    setOpenCloseDialog,
    openDialog,
  } = PositionTitleStore;
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

  const [PositionTitleId, setPositionTitleId] = useState<number>(0);
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('GeneralFields.Id')}`, align: 'left' },
    { id: 'englishName', label: `${translate('GeneralFields.EnglishName')}`, align: 'left' },
    { id: 'pashtoName', label: `${translate('GeneralFields.PashtoName')}`, align: 'left' },
    { id: 'dariName', label: `${translate('GeneralFields.DariName')}`, align: 'left' },
    { id: 'jobPosition', label: `${translate('JobPosition.JobPosition')}`, align: 'left' },
    { id: 'code', label: `${translate('GeneralFields.Code')}`, align: 'left' },
    { id: 'isActive', label: `${translate('GeneralFields.isActive')}`, align: 'left' },
    { id: '', label: `${translate('GeneralFields.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      PositionTitleSearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        name: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      PositionTitleSearch({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setPositionTitleId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: number) => {
    getPositionTitleFromRegistry(id);
    navigate(PATH_DASHBOARD.PositionTitle.edit);
  };

  // const handleDelete = () => {
  //   deletePositionTitle(PositionTitleId)
  //     .then(() => {
  //       setOpenConfirm(false);
  //       enqueueSnackbar('Delete  success!');
  //       setPositionTitleId(0);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       enqueueSnackbar(`${translate('Tostar.DeleteFailed')}`, {
  //         variant: 'error',
  //       });
  //       setOpenConfirm(false);
  //       setPositionTitleId(0);
  //     });
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(newPage)
    console.log(rowsPerPage)
    loadPositionTitle({ pageIndex: newPage, pageSize: rowsPerPage });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loadPositionTitle({ pageIndex: 0, pageSize: pageZize });
  };
  useEffect(() => {
    if (PositionTitleRegistry.size <= 1) {
      console.log(rowsPerPage)
      loadPositionTitle({ pageIndex: 0, pageSize: rowsPerPage });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: PositionTitleList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('PositionTitle.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('PositionTitle.PositionTitleList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            { name: `${translate('PositionTitle.PositionTitleList')}` },
          ]}
          action={
            <>
              <PermissionBasedGuard permissions={['PositionTitle-Create']}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  component={RouterLink}
                  to={PATH_DASHBOARD.PositionTitle.new}
                >
                  {translate('CRUD.Create')}
                </Button>
              </PermissionBasedGuard>
            </>
          }
        />

        <Card>
          <PositionTitleTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <PositionTitleTableRow
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
              <StatusDelete id={PositionTitleId} />
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
  tableData: IPositionTitle[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return b[1] - a[1];
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
