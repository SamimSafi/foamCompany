import { Button, Grid, Stack, Typography } from '@mui/material';
import { useStore } from 'src/stores/store';
import BarChart from 'src/customeCharts/BarChart';
import useLocales from 'src/hooks/useLocales';
import EmptyContent from 'src/components/EmptyContent';
import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';
// type Props={
//     archiveDashboard:boolean;
// }
export default function ArchiveDashboard() {
  const { translate } = useLocales();
  const navigate = useNavigate();

  return (
    <>
      <Grid
        item
        xs={6}
        md={12}
        sx={{ display: 'flex', alignContent: 'flex-end', mb: 4 }}
        justifyContent={'space-between'}
      >
        {/* <Stack direction="row" spacing={1.5} sx={{ mt: 1, ml: 0, mb: 1 }}> */}
        <Typography variant="h4">{translate('Dashboard.ArchiveDashboard')}</Typography>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          onClick={() => {
            navigate(PATH_DASHBOARD.root);
            //clearEmployee();
          }}
        >
          {translate('CRUD.BackToDashboard')}
        </Button>
        {/* </Stack> */}
      </Grid>
     
    </>
  );
}
