import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useLocales from 'src/hooks/useLocales';
import { IJobPosition } from 'src/@types/JobPosition';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
// ----------------------------------------------------------------------

type Props = {
  row: IJobPosition;
  // selected: boolean;
  onEditRow: VoidFunction;
  //onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: any;
};

export default function JobPositionTableRow({ row, onEditRow, onDeleteRow, index }: Props) {
  const theme = useTheme();

  const { id, englishName, dariName, pashtoName, code } = row;
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
      <TableCell align="left">{englishName}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {pashtoName}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dariName}
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
              <PermissionBasedGuard permissions={['JobPosition-Delete']}>
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
              <PermissionBasedGuard permissions={['JobPosition-Update']}>
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
