import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, MenuItem, Tooltip } from '@mui/material';
// @types

// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useLocales from 'src/hooks/useLocales';
import { IEmployee } from 'src/@types/foamCompanyTypes/Employee';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
import { ISupplier } from 'src/@types/foamCompanyTypes/Supplier';

// ----------------------------------------------------------------------

const language = window.localStorage.getItem('i18nextLng');

type Props = {
  row: ISupplier;
  index: any;
  onEditRow: VoidFunction;
  onCreateUser: VoidFunction;
  onDeleteRow: VoidFunction;
  onCardDetails: VoidFunction;
  onContractDetails: VoidFunction;
  onEducationalLevelDetails: VoidFunction;
  handleDetail: VoidFunction;
  doubleClick: any;
};

export default function SupplierTableRow({
  row,
  onEditRow,
  onCreateUser,
  onDeleteRow,
  onCardDetails,
  onContractDetails,
  onEducationalLevelDetails,
  handleDetail,
  index,
  doubleClick,
}: Props) {
  const theme = useTheme();
  const language = window.localStorage.getItem('i18nextLng');
  const { id, surName, phone, email, name, location } = row;
  const { translate } = useLocales();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <Tooltip
      title={
        <span>
          {translate('Employee.DoubleClick')}{' '}
          <span style={{ color: '#00bcd4', fontSize: '13px', fontWeight: 'bold' }}>{name}</span>{' '}
          {translate('Employee.EmployeeDetail')}
        </span>
      }
      placement="top"
    >
      <TableRow hover onClick={doubleClick}>
        <TableCell align="left">{index + 1}</TableCell>
        <TableCell align="left">{name}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {surName}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {email}
        </TableCell>

        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize', alignItems: 'left' }}
          dir={language === 'en' ? 'ltr' : 'ltr'}
        >
          {phone}
        </TableCell>

        <TableCell align="left">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <PermissionBasedGuard permissions={['Employee-Delete']}>
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
                <PermissionBasedGuard permissions={['Employee-Update']}>
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
                {/* {!hasAccount ? (
                  <MenuItem
                    onClick={() => {
                      onCreateUser();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify sx={{ color: 'info.main' }} icon={'mdi:user-add-outline'} />
                    {translate('Employee.CreateUser')}
                  </MenuItem>
                ) : (
                  <></>
                )} */}

                <MenuItem
                  onClick={() => {
                    onContractDetails();
                    handleCloseMenu();
                  }}
                >
                  <Iconify sx={{ color: 'info.main' }} icon={'material-symbols:contract'} />
                  {translate('Employee.ContractDetails')}
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    onCardDetails();
                    handleCloseMenu();
                  }}
                >
                  <Iconify sx={{ color: 'success.main' }} icon={'entypo:v-card'} />
                  {translate('Employee.CardDetails')}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onEducationalLevelDetails();
                    handleCloseMenu();
                  }}
                >
                  <Iconify sx={{ color: 'warning.main' }} icon={'icon-park-outline:degree-hat'} />
                  {translate('Employee.EducationalLevelDetails')}
                </MenuItem>
                <PermissionBasedGuard permissions={['Employee-GetDetail']}>
                  <MenuItem
                    onClick={() => {
                      handleDetail();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify sx={{ color: 'info.main' }} icon={'mdi:account-details'} />
                    {translate('Employee.Details')}
                  </MenuItem>
                </PermissionBasedGuard>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </Tooltip>
  );
}
