import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useLocales from 'src/hooks/useLocales';
import { IPositionTitle } from 'src/@types/foamCompanyTypes/PositionTitle';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
import Label from 'src/components/Label';
// ----------------------------------------------------------------------

type Props = {
  row: IPositionTitle;
  // selected: boolean;
  onEditRow: VoidFunction;
  //onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: any;
};

export default function PositionTitleTableRow({ row, onEditRow, onDeleteRow, index }: Props) {
  const theme = useTheme();

  const { id, name, branchName } = row;
  const { translate } = useLocales();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell align="left">{name}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {branchName}
      </TableCell>

      <TableCell align="center">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <PermissionBasedGuard permissions={['PositionTitle-Delete']}>
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
              <PermissionBasedGuard permissions={['PositionTitle-Update']}>
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
}
