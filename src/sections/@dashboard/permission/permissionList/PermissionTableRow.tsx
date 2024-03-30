import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography } from '@mui/material';
// @types
// components
import { observer } from 'mobx-react-lite';
import { IPermision } from 'src/@types/permission';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

type Props = {
  row: IPermision;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onDetailRow: VoidFunction;
  index: any;
};

export default observer(function PermissionTableRow({
  row,
  onEditRow,
  onDeleteRow,
  onDetailRow,
  index,
}: Props) {
  const theme = useTheme();

  const {
    id,
    controllerName,
    IsActionCatagoryMissing,
    controller,
    action,
    method,
    actionCategory,
    description,
    application,
    name,
  } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  //const docBookReceivedNo = row.documentBookRecivedNumber;

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {index + 1}
        </Typography>
      </TableCell>
      {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {trackingId}
      </TableCell> */}

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {name}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {controller}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {action}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {method}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {application}
      </TableCell>

      {/* <TableCell align="left">
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
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onDetailRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:clipboard-outline'} />
                Detail
              </MenuItem>

             
            </>
          }
        />
      </TableCell> */}
    </TableRow>
  );
});
