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
import { District } from 'src/@types/district';
import DistrictTableToolbar from './DistrictTableToolbar';
import DistrictTableRow from './DistrictTableRow';
import DistrictDelete from './DistrictDelete';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';

// ----------------------------------------------------------------------

export default observer(function DistrictList() {
  const { translate } = useLocales();
  const { DistrictStore } = useStore();
  const {
    loadDistrict,
    DistrictList,
    DistrictRegistry,
    totalRecord,
    DistrictSearch,
    getDistrictRegistry,
    setOpenCloseDialog,
    loadDistrictDetail,
    openDialog,
  } = DistrictStore;
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
    { id: 'ID', label: `${translate('SubRegion.Id')}`, align: 'left' },
    { id: 'DistrictEnglishName', label: `${translate('District.EnglishName')}`, align: 'left' },
    { id: 'DistrictPashtoName', label: `${translate('District.PashtoName')}`, align: 'left' },
    { id: 'DistrictDariName', label: `${translate('District.DariName')}`, align: 'left' },
    { id: 'Province', label: `${translate('Province.Province')}`, align: 'left' },
    { id: 'code', label: `${translate('District.Code')}`, align: 'left' },
    { id: '', label: `${translate('Department.Action')}` },
  ];
  const { themeStretch } = useSettings();

  const [filterName, setFilterName] = useState('');

  const navigate = useNavigate();

  const [DistrictId, setDistrictId] = useState<number>(0);

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      DistrictSearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        name: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      DistrictSearch({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setDistrictId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };

  const handleEditRow = (id: number) => {
    getDistrictRegistry(id);
    loadDistrictDetail(id).then((res) => {
      navigate(PATH_DASHBOARD.district.edit);
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadDistrict({ pageIndex: newPage, pageSize: rowsPerPage });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loadDistrict({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    if (DistrictRegistry.length <= 1) {
      loadDistrict({ pageIndex: 0, pageSize: rowsPerPage });
    }
  }, []);

  const dataFiltered = applySortFilter({
    tableData: DistrictList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('District.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('District.DistrictList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('District.District')}`,
              href: PATH_DASHBOARD.district.root,
            },
            { name: `${translate('District.DistrictList')}` },
          ]}
          action={
            <PermissionBasedGuard permissions={['District-Create']}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.district.new}
              >
                {translate('CRUD.Create')}
              </Button>
            </PermissionBasedGuard>
          }
        />

        <Card>
          <DistrictTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <DistrictTableRow
                        key={row.id}
                        index={index}
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
              component="div"
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
              <DistrictDelete id={DistrictId} />
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
  tableData: District[];
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
