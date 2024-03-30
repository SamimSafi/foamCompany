import { TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { TimePicker } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterJalali from '@date-io/date-fns-jalali';
// import faIR from 'date-fns-jalali/esm/locale/fa-IR';

// import enUS from 'date-fns-jalali/esm/locale/en-US';
// import faJalaliIR from 'date-fns-jalali/esm/locale/fa-jalali-IR';
import AdapterHijri from '@date-io/hijri';

import { useState } from 'react';

import jalaliUtils from '@date-io/jalaali';
import { enUS, faIR, faJalaliIR } from 'date-fns-jalali/esm/locale';
// import faIR from './locale/fa-IR';
// import faJalaliIR from './locale/fa-jalali-IR';
// import enUS from './locale/en-US';

interface Props {
  control: any;
  label: any;
  name: any;
  isDisablePast?: any;
  size?: any;
  views?: any;
  showAsterisk?: boolean;
}

export default function NewTimePicker({
  control,
  label,
  name,
  isDisablePast,
  size,
  showAsterisk,
  views,
}: Props) {
  const getlanguageFromLocalStorage = localStorage.getItem('i18nextLng');

  const [open, setOpen] = useState(false);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TimePicker
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            views={views}
            label={
              <Typography>
                {label}{' '}
                {showAsterisk && <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>}
              </Typography>
            }
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                onClick={(e) => setOpen(true)}
                fullWidth
                size={size}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />
    </>
  );
}
