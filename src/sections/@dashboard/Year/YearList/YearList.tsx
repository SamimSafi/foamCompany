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
import useLocales from 'src/hooks/useLocales';
// @types
import { YearInterface } from '../../../../@types/Year';

// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../../../components/table';
// sections
import YearTableRow from './YearTableRow';
import YearTableToolbar from './YearTableToolbar';

import { useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import MyDialog from 'src/components/MyDialog';
import YearDelete from './YearDelete';

// ----------------------------------------------------------------------

export default observer(function YearList() {
  const { YearStore } = useStore();
  const { translate } = useLocales();
  const {
    loadYear,
    YearList,
    YearRegistry,
    totalRecord,
    YearSearch,
    deleteYear,
    getYearFromRegistry,
    setOpenCloseDialog,
    openDialog,
  } = YearStore;
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

  const [YearId, setYearId] = useState<number>(0);
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('Department.Id')}`, align: 'left' },
    { id: 'yearShamsi', label: `${translate('Year.YearShamsi')}`, align: 'left' },
    { id: 'setDefault', label: `${translate('Year.SetDefault')}`, align: 'left' },

    { id: '', label: `${translate('Department.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      YearSearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        yearShamsi: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      YearSearch({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setYearId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: number) => {
    getYearFromRegistry(id);
    navigate(PATH_DASHBOARD.Year.edit);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadYear({ pageIndex: newPage, pageSize: rowsPerPage });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loadYear({ pageIndex: 0, pageSize: rowsPerPage });
  };
  useEffect(() => {
    if (YearRegistry.length <= 1) {
      loadYear({ pageIndex: 0, pageSize: rowsPerPage });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: YearList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('Year.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('Year.YearList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Year.YearShamsi')}`,
              href: PATH_DASHBOARD.Year.root,
            },
            { name: `${translate('Year.YearList')}` },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.Year.new}
            >
              {translate('CRUD.Create')}
            </Button>
          }
        />

        <Card>
          <YearTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <YearTableRow
                        index={index}
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
              labelRowsPerPage={translate('Pagination.RowsPerPage')}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${translate('Pagination.Of')} ${count}`
              }
              component="div"
              count={totalRecord}
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
              <YearDelete id={YearId} />
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
  tableData: YearInterface[];
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
        item.yearShamsi.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
