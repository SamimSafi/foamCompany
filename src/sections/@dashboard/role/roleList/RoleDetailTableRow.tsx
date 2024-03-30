// @mui
import {
  TableRow,
  TableCell,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardHeader,
  Box,
  Divider,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
import Iconify from 'src/components/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';
// @types
import { permissionsList, roleDetail } from 'src/@types/role';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { title } from 'process';
import Scrollbar from 'src/components/Scrollbar';
import { TableHeadCustom } from 'src/components/table';
//Localization
import useLocales from 'src/hooks/useLocales';

type Props = {
  row: roleDetail;
  clearRole: () => void;
};

export default function RoleDetailTableRow({ row, clearRole }: Props) {
  const { translate } = useLocales(); //Localization
  const navigate = useNavigate();

  const { applicationId, name, description, application, id, permissions } = row;
  const TABLE_HEAD = [
    { id: 'id', label: `${translate('userRole.Id')}`, align: 'left' },
    { id: 'name', label: `${translate('userRole.PermissionName')}`, align: 'left' },
    { id: 'controller', label: `${translate('userRole.ControllerName')}`, align: 'left' },
    { id: 'action', label: `${translate('Department.Action')}`, align: 'left' },
    { id: 'method', label: `${translate('userRole.Method')}` },
    { id: 'application', label: `${translate('userRole.Application')}` },
    { id: 'description', label: `${translate('userRole.Description')}` },
  ];

  return (
    <>
      <Grid item xs={12} md={12}>
        <Stack spacing={3}>
          <Card>
            <Stack spacing={90} direction="row">
              <CardHeader title={translate('userRole.RoleDetails')} />
              <Button
                sx={{ mt: 2 }}
                color="secondary"
                size="small"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  navigate(PATH_DASHBOARD.Role.list);
                  clearRole();
                }}
              >
                {translate('CRUD.BackToList')}
              </Button>
            </Stack>

            <Stack
              spacing={25}
              sx={{ p: 2, alignItems: 'center', textAlign: 'center' }}
              direction="row"
            >
              <Stack direction="row">
                {translate('userRole.RoleName')}: &nbsp;
                <Typography variant="body2">{name}</Typography>
              </Stack>

              <Stack direction="row">
                {translate('userRole.Application')}: &nbsp;
                <Typography variant="body2">{application}</Typography>
              </Stack>

              <Stack direction="row">
                {translate('userRole.Description')}: &nbsp;
                <Typography variant="body2">{description}</Typography>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Grid>
      <Divider />
      <Grid item xs={12} md={12} sx={{ mt: 2 }}>
        <Card>
          <CardHeader title={`${translate('userRole.PermissionDetails')}`} sx={{ mb: 3 }} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 720 }}>
              <Table>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {permissions.map((row) => (
                    <PermissionDetails key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Divider />
        </Card>
      </Grid>
    </>
  );
}

//---------------------------------------------

type PermissionDetailsProps = {
  row: permissionsList;
};

function PermissionDetails({ row }: PermissionDetailsProps) {
  return (
    <TableRow>
      <TableCell>{row.id}</TableCell>

      <TableCell>{row.name}</TableCell>

      <TableCell>{row.controller}</TableCell>

      <TableCell>{row.action}</TableCell>
      <TableCell>{row.method}</TableCell>
      <TableCell>{row.application}</TableCell>
      <TableCell>{row.description}</TableCell>
    </TableRow>
  );
}
