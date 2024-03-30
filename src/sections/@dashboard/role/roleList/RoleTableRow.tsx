import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// @types
import { IRole } from '../../../../@types/role';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { observer } from 'mobx-react-lite';
//Localization
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

type Props = {
  row: IRole;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onDetailRow: VoidFunction;
  index: any;
};

export default observer(function RoleTableRow({
  row,
  onEditRow,
  onDeleteRow,
  onDetailRow,
  index,
}: Props) {
  const theme = useTheme();

  const { id, applicationId, name, description, permissionIds, application, totalPermissions } =
    row;
  const { translate } = useLocales(); //Localization

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
        {application}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {name}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {description}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {totalPermissions}
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
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
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

              <MenuItem
                onClick={() => {
                  onDetailRow();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'eva:clipboard-outline'} />
                {translate('CRUD.Detail')}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
});
