import { Button, Grid, Typography } from '@mui/material';
import {
  AppCurrentDownload,
  AppWelcome,
  AppWidgetSummary,
} from 'src/sections/@dashboard/general/app';
import { useTheme } from '@mui/material/styles';
import { SeoIllustration } from 'src/assets';
import AppWidgetSummaryFour from 'src/sections/@dashboard/general/app/AppWidgetSummaryFour';
import AppWidgetSummaryTwo from 'src/sections/@dashboard/general/app/AppWidgetSummaryTwo';
import AppWidgetSummaryFive from 'src/sections/@dashboard/general/app/AppWidgetSummaryFive';
import AppWidgetSummaryThree from 'src/sections/@dashboard/general/app/AppWidgetSummaryThree';
import useLocales from 'src/hooks/useLocales';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';
import AppWidgetSummarySix from 'src/sections/@dashboard/general/app/AppWidgetSummarySix';
import AppWidgetSummarySeven from 'src/sections/@dashboard/general/app/AppWidgetSummarySeven';

export default function MisWorkDashboard() {
  const theme = useTheme();
  const { translate } = useLocales();
  const navigate = useNavigate();

  return (
    <>
      {/* <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid> */}
      <Grid
        item
        xs={6}
        md={12}
        sx={{ display: 'flex', alignContent: 'flex-end', mb: 4 }}
        justifyContent={'space-between'}
      >
        {/* <Stack direction="row" spacing={1.5} sx={{ mt: 1, ml: 0, mb: 1 }}> */}
        <Typography variant="h4">{translate('Dashboard.MISWorkDashboard')}</Typography>
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
      <Grid item xs={12} md={12}>
        <AppWidgetSummaryFour
          title={translate('MISWorkDashboard.AMS')}
          percent={-0.1}
          total={100}
          chartColor={theme.palette.chart.violet[0]}
          chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <AppWidgetSummaryThree
          title={translate('MISWorkDashboard.Archive')}
          percent={-0.1}
          total={95}
          chartColor={theme.palette.chart.red[0]}
          chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <AppWidgetSummary
          title={translate('MISWorkDashboard.DMTS')}
          percent={70}
          total={90}
          chartColor={theme.palette.primary.main}
          chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
        />
        {/* <AppStepperOne /> */}
      </Grid>

      <Grid item xs={12} md={12}>
        <AppWidgetSummaryTwo
          title={translate('MISWorkDashboard.ITSMS')}
          percent={0.2}
          total={100}
          chartColor={theme.palette.chart.blue[0]}
          chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <AppWidgetSummaryFive
          title={translate('MISWorkDashboard.Reception')}
          percent={-0.1}
          total={100}
          chartColor={theme.palette.chart.yellow[0]}
          chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <AppWidgetSummarySix
          title={translate('MISWorkDashboard.NewsAlertSystem')}
          percent={-0.1}
          total={95}
          chartColor={theme.palette.primary.main}
          chartData={[8, 9, 31, 8, 16, 37, 8, 33, 40, 8]}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <AppWidgetSummarySeven
          title={translate('MISWorkDashboard.TrainingVideoSystem')}
          percent={-0.1}
          total={100}
          chartColor={theme.palette.chart.blue[0]}
          chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentDownload
          title={translate('MISWorkDashboard.AMS')}
          chartColors={[
            theme.palette.primary.lighter,
            theme.palette.primary.light,
            theme.palette.primary.main,
            theme.palette.primary.dark,
          ]}
          chartData={[
            { label: `${translate('MISWorkDashboard.Remains')}`, value: 0 },
            { label: `${translate('MISWorkDashboard.Completed')}`, value: 100 },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentDownload
          title={translate('MISWorkDashboard.Archive')}
          chartColors={[
            theme.palette.primary.lighter,
            theme.palette.primary.light,
            theme.palette.primary.main,
            theme.palette.primary.dark,
          ]}
          chartData={[
            { label: `${translate('MISWorkDashboard.Remains')}`, value: 5 },
            { label: `${translate('MISWorkDashboard.Completed')}`, value: 95 },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentDownload
          title={translate('MISWorkDashboard.DMTS')}
          chartColors={[
            theme.palette.primary.lighter,
            theme.palette.primary.light,
            theme.palette.primary.main,
            theme.palette.primary.dark,
          ]}
          chartData={[
            { label: `${translate('MISWorkDashboard.Remains')}`, value: 10 },
            { label: `${translate('MISWorkDashboard.Completed')}`, value: 90 },
          ]}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        alignItems="center"
        justifyContent="center"
        spacing={0}
        direction="column"
      >
        <AppCurrentDownload
          title={translate('MISWorkDashboard.ITSMS')}
          chartColors={[
            theme.palette.primary.lighter,
            theme.palette.primary.light,
            theme.palette.primary.main,
            theme.palette.primary.dark,
          ]}
          chartData={[
            { label: `${translate('MISWorkDashboard.Remains')}`, value: 0 },
            { label: `${translate('MISWorkDashboard.Completed')}`, value: 100 },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentDownload
          title={translate('MISWorkDashboard.Reception')}
          chartColors={[
            theme.palette.primary.lighter,
            theme.palette.primary.light,
            theme.palette.primary.main,
            theme.palette.primary.dark,
          ]}
          chartData={[
            { label: `${translate('MISWorkDashboard.Remains')}`, value: 0 },
            { label: `${translate('MISWorkDashboard.Completed')}`, value: 100 },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentDownload
          title={translate('MISWorkDashboard.NewsAlertSystem')}
          chartColors={[
            theme.palette.primary.lighter,
            theme.palette.primary.light,
            theme.palette.primary.main,
            theme.palette.primary.dark,
          ]}
          chartData={[
            { label: `${translate('MISWorkDashboard.Remains')}`, value: 5 },
            { label: `${translate('MISWorkDashboard.Completed')}`, value: 95 },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentDownload
          title={translate('MISWorkDashboard.TrainingVideoSystem')}
          chartColors={[
            theme.palette.primary.lighter,
            theme.palette.primary.light,
            theme.palette.primary.main,
            theme.palette.primary.dark,
          ]}
          chartData={[
            { label: `${translate('MISWorkDashboard.Remains')}`, value: 0 },
            { label: `${translate('MISWorkDashboard.Completed')}`, value: 100 },
          ]}
        />
      </Grid>
    </>
  );
}
