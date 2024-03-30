import { ReactElement } from 'react';
// @mui
import { Card, Typography, Box, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  total: string;
   icon: ReactElement;
}

export default function BookingWidgetSummary({total,icon, sx, ...other }: Props) {
  return (
    <Card
      sx={{
        backgroundColor:'lightgreen',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 3,
        ...sx,
      }}
      {...other}
    >
      <div>
        <Typography variant="h5" sx={{color:'black'}}>{total}</Typography>

       
      </div>

      <Box
        sx={{
          width: 50,
          height: 50,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        
        {icon}
      </Box>
    </Card>
  );
}
