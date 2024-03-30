import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, MenuItem, Button, Avatar } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { observer } from 'mobx-react-lite';
import { CreateUser, UserLog } from 'src/@types/createUser';
import agent from 'src/api/agent';
import { useStore } from 'src/stores/store';
import useLocales from '../../../../hooks/useLocales';

import { baseUrl } from 'src/api/baseUrl';
import { DateConverter } from 'src/sections/common/DateConverter';
import { DayPicker } from 'src/sections/common/locale/DayPicker';

// ----------------------------------------------------------------------

type Props = {
  row: UserLog;
  index: any;
};

export default observer(function UserLogTableRow({ row, index }: Props) {
  const theme = useTheme();
  const { UserStore } = useStore();
  const { UserActivations, clearSelectedUser } = UserStore;
  const {
    id,
    userName,
    userId,
    user,
    action,
    actionOn,
    ipAddress,
    deviceName,
    deviceType,
    result,
    message,
    browserName,
    browserVersion,
    os,
  } = row;
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

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {userName}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {action}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        <DateConverter date={actionOn}></DateConverter>
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        <DayPicker date={actionOn}></DayPicker>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {ipAddress}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {message}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {deviceName}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {browserName}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {os}
      </TableCell>
    </TableRow>
  );
});
