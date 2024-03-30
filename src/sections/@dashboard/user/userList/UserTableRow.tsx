import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, MenuItem, Button, Avatar } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { observer } from 'mobx-react-lite';
import { CreateUser } from 'src/@types/createUser';
import agent from 'src/api/agent';
import { useStore } from 'src/stores/store';
import useLocales from '../../../../hooks/useLocales';

import { baseUrl } from 'src/api/baseUrl';
// ----------------------------------------------------------------------

type Props = {
  row: CreateUser;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onDetailRow: VoidFunction;
  onPasswordReset: VoidFunction;
  index: any;
};

export default observer(function UserTableRow({
  row,
  onEditRow,
  onDeleteRow,
  onDetailRow,
  onPasswordReset,
  index,
}: Props) {
  const theme = useTheme();
  const { UserStore } = useStore();
  const { UserActivations, clearSelectedUser } = UserStore;
  const { id, userName, email, employeeName } = row;
  const { enqueueSnackbar } = useSnackbar();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { translate } = useLocales();

  const handleActivations = (id: string, isActive: boolean) => {
    UserActivations(id, isActive).then(() => {
      isActive
        ? enqueueSnackbar(`${translate('Tostar.UserDeactivated')}`, {
            variant: 'error',
          })
        : enqueueSnackbar(`${translate('Tostar.UserActivated')}`);

      clearSelectedUser();
    });
  };
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  let Url = baseUrl;
  //const docBookReceivedNo = row.documentBookRecivedNumber;

  return (
    <TableRow hover>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {index + 1}
      </TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar alt={userName} src={Url + photoPath!} sx={{ mr: 2 }} /> */}
        <Typography variant="subtitle2" noWrap>
          {userName}
        </Typography>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {email}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {employeeName}
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
              <MenuItem
                onClick={() => {
                  onPasswordReset();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'info.main' }} icon={'eva:clipboard-outline'} />
                {translate('User.ResetPassword')}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
});
