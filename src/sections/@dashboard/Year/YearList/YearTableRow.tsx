import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// @types
import { YearInterface } from '../../../../@types/Year';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useLocales from 'src/hooks/useLocales';
import Label from 'src/components/Label';
// ----------------------------------------------------------------------

type Props = {
  row: YearInterface;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: any;
};

export default function YearTableRow({ row, onEditRow, onDeleteRow, index }: Props) {
  const theme = useTheme();
  const { translate } = useLocales();
  const { id, yearShamsi, setDefault } = row;

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
      <TableCell align="left">
        <Label variant={'ghost'} color="success">
          {yearShamsi}
        </Label>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {setDefault === true ? 'True' : 'false'}
      </TableCell>

      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'error.main' }} icon={'eva:trash-2-outline'} />
                {translate('CRUD.Delete')}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'warning.main' }} icon={'eva:edit-fill'} />
                {translate('CRUD.Update')}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
