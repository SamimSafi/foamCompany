import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField, CardProps } from '@mui/material';
// components
import { BaseOptionChart } from 'src/components/chart';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartData: {
    structureName?: string[];
    value: number;
    groupBy: string;
    data: {
      name: string;
      data: number[];
    }[];
  }[];
}

export default function BarChart({ title, subheader, chartData, ...other }: Props) {
  const [seriesData, setSeriesData] = useState('3');
  const [chartIndex, setChartIndex] = useState(3);

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(event.target.value);
    if (event.target.value === '3') {
      setChartIndex(3);
    } else if (event.target.value === '2') {
      setChartIndex(2);
    } else if (event.target.value === '1') {
      setChartIndex(1);
    } else if (event.target.value === '0') {
      setChartIndex(0);
    }
  };

  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        columnWidth: '100%',
      },
    },
    xaxis: {
      categories: chartData[chartIndex].structureName,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
            }}
          >
            {chartData.map((option) => (
              <option key={option.value} value={option.value}>
                {option.groupBy}
              </option>
            ))}
          </TextField>
        }
      />

      {chartData.map((item) => (
        <Box key={item.value} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.value.toString() === seriesData && (
            <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
