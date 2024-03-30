import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { observer } from 'mobx-react-lite';
import useLocales from 'src/hooks/useLocales';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
import { Province } from 'src/@types/province';
// ----------------------------------------------------------------------

type Props = {
  row: Province;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: number;
};

export default observer(function DistrictTableRow({ row, onEditRow, onDeleteRow, index }: Props) {
  const theme = useTheme();
  const { translate } = useLocales();
  const { englishName, dariName, pashtoName, code, provinceName } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {index + 1}
        </Typography>
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {englishName}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {pashtoName}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {dariName}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {provinceName}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {code}
      </TableCell>
      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <PermissionBasedGuard permissions={['District-Delete']}>
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  {translate('CRUD.Delete')}
                </MenuItem>
              </PermissionBasedGuard>
              <PermissionBasedGuard permissions={['District-Update']}>
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify sx={{ color: 'warning.main' }} icon={'eva:edit-fill'} />
                  {translate('CRUD.Update')}
                </MenuItem>
              </PermissionBasedGuard>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
});
