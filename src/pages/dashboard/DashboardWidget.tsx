import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box, CardProps } from '@mui/material';
// theme
import { ColorSchema } from 'src/theme/palette';
// components
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: 200,
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker,
  justifyContent: 'space-between',
}));

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 100,
  height: 100,
  position: 'absolute',
  top: theme.spacing(2),
  //alignSelf: 'center',
  color: theme.palette.common.white,
  // marginLeft: 15,
  // marginRight: 5,
}));

const TypographyStyle = styled(Typography)(({ theme }) => ({
  bottom: theme.spacing(2),
  marginTop: 'auto',
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  icon: string;
  title: string;
  color?: ColorSchema;
}

export default function DashboardWidget({ title, icon, color, ...other }: Props) {
  const theme = useTheme();

  return (
    <RootStyle
      sx={{
        bgcolor: theme.palette[color!].main,
      }}
      {...other}
    >
      <IconStyle icon={icon} />
      <Box sx={{ color: 'common.white', marginTop: 'auto' }}>
        {/* <Typography variant="h4">{title}</Typography> */}
        <TypographyStyle variant="h5" textAlign={'center'}>
          {title}
        </TypographyStyle>
      </Box>
    </RootStyle>
  );
}
