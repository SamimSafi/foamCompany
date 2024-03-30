import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Stack, Divider, CardHeader, Typography, CardProps } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import { BaseOptionChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  '& .apexcharts-legend': {
    width: 240,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      height: 160,
      width: '50%',
    },
  },
  '& .apexcharts-datalabels-group': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  title2?: string;
  subheader?: string;
  chartColors: string[];
  chartData: {
    totalCategoryCount: number;
    totalValueSum: number;
    data: {
      label: string;
      value: number;
    }[];
  }[];
}

export default function SpiderChart({
  title,
  title2,
  subheader,
  chartColors,
  chartData,
  ...other
}: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const chartLabels = chartData[0].data.map((i) => i.label);
  const chartSeries = chartData[0].data.map((i) => i.value);

  const chartOptions = merge(BaseOptionChart(), {
    labels: chartLabels,
    colors: chartColors,
    stroke: {
      colors: [theme.palette.background.paper],
    },
    fill: { opacity: 0.8 },
    yaxis: {
      labels: {
        formatter: (chartSeries: any) => {
          return chartSeries.toFixed(1);
        },
      },
    },
    legend: {
      position: 'right',
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    plotBands: [{ from: 8, to: 15, color: '#FFFFFF', zIndex: 5 }],
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'left',
          },
        },
      },
    ],
  });

  return (
    <RootStyle {...other}>
      {/* <CardHeader title={title} subheader={subheader} /> */}

      <Box sx={{ my: 5 }} dir="ltr">
        <ReactApexChart
          type="polarArea"
          series={chartSeries}
          options={chartOptions}
          height={isDesktop ? 240 : 360}
        />
      </Box>

      <Divider />

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>
            {title}
          </Typography>
          <Typography sx={{ typography: 'h4' }}>{chartData[0].totalCategoryCount}</Typography>
        </Box>

        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>
            {title2}
          </Typography>
          <Typography sx={{ typography: 'h4' }}>{chartData[0].totalValueSum}</Typography>
        </Box>
      </Stack>
    </RootStyle>
  );
}
