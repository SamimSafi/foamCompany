import React from 'react';
import { TimePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default function TimePickerViewRenderers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="With Time Clock"
        value={null}
        onChange={(newValue) => {
          console.log(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
