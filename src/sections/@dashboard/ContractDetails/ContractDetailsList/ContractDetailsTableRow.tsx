import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, MenuItem } from '@mui/material';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useLocales from 'src/hooks/useLocales';
import { IContractDetails } from 'src/@types/foamCompanyTypes/ContractDetails';
import { DateConverter } from 'src/sections/common/DateConverter';
import Label from 'src/components/Label';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
// ----------------------------------------------------------------------

type Props = {
  row: IContractDetails;
  // selected: boolean;
  onEditRow: VoidFunction;
  //onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: any;
};

export default function ContractDetailsTableRow({ row, onEditRow, onDeleteRow, index }: Props) {
  const theme = useTheme();

  const {
    id,
    employeeName,
    contractType,
    startDate,
    endDate,
    isCurrent,
    positionTitleName,
    branch,
    remarks,
    salaryPerHour
  } = row;
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
      {/* <TableCell align="left">{employeeName}</TableCell> */}
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {contractType}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {branch}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {positionTitleName}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {salaryPerHour}
      </TableCell>
      {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {jobPosition}
      </TableCell> */}
      {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {positionTitle}
      </TableCell> */}

      {/* <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {gradeStep}
      </TableCell> */}
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {<DateConverter date={startDate} />}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {endDate != null ? (
          <DateConverter date={endDate} />
        ) : (
          `${translate('ContractType.EmployeeIsPermanent')}`
        )}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {
          <Label
            variant="ghost"
            color={
              (isCurrent === true && 'success') || (isCurrent === false && 'error') || 'primary'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {isCurrent == true
              ? `${translate('ContractType.Current')}`
              : `${translate('ContractType.Ended')}`}
          </Label>
        }
      </TableCell>

      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <PermissionBasedGuard permissions={['ContractDetails-Delete']}>
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
              <PermissionBasedGuard permissions={['ContractDetails-Update']}>
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
