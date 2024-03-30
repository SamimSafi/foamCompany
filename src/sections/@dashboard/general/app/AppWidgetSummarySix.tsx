import ReactApexChart from 'react-apexcharts';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Typography,
  Stack,
  CardProps,
  Step,
  StepLabel,
  Stepper,
  Grid,
} from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number;
  percent: number;
  chartColor: string;
  chartData: number[];
}

export default function AppWidgetSummary({
  title,
  percent,
  total,
  chartColor,
  chartData,
  sx,
  ...other
}: Props) {
  const theme = useTheme();
  const { translate } = useLocales();

  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: number | string) => fNumber(seriesName),
        title: {
          formatter: (seriesName: number | string) => '',
        },
      },
      marker: { show: false },
    },
  };
  const steps = [
    `${translate('First.RequirementGathering')}`,
    `${translate('First.Analysis')}`,
    `${translate('First.Design')}`,
    `${translate('First.Development')}`,
    `${translate('First.Testing')}`,
    `${translate('First.Deployment50')}`,
  ];
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Grid container item sm={12} md={12}>
        <Grid direction="row" item sm={12} md={12}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">{title}</Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
              <Typography variant="h3"> {fPercent(total)}</Typography>
              <ReactApexChart
                type="bar"
                series={[{ data: chartData }]}
                options={chartOptions}
                width={60}
                height={36}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} sx={{ mt: 5 }}>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={6} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>
        <Grid item sm={12} md={12}></Grid>
      </Grid>
    </Card>
  );
}
