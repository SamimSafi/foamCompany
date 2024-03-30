// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, TextField, Typography } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import useTable from 'src/hooks/useTable';

// ----------------------------------------------------------------------

const BoxStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.text.disabled,
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ----------------------------------------------------------------------

export default function SettingPagination() {
  const { tablePagination, onChangePagination } = useSettings();
  const paginationValues = [5, 10, 25, 50, 100, 150, 200];

  const handleNumberClick = (number: number) => {
    onChangePagination(number);
  };
  return (
    <BoxStyle>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5px' }}>
        {paginationValues.map((value) => {
          const isSelected = value === tablePagination;
          return (
            <IconButton
              size="small"
              key={value}
              onClick={() => handleNumberClick(value)}
              color={isSelected ? 'primary' : 'default'}
              style={{
                backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                color: isSelected ? 'primary' : 'default',
              }}
            >
              <Typography variant="body2">{value}</Typography>
            </IconButton>
          );
        })}
      </div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: 'background.default',
          display: 'flex',
        }}
      >
        <TextField
          inputProps={{ min: 0, style: { textAlign: 'center' } }}
          onChange={() => {}}
          value={tablePagination}
          disabled // Disable the TextField
        />
      </Stack>
    </BoxStyle>
  );
}
