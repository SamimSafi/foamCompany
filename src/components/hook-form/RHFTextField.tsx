// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps, OutlinedInput, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  showAsterisk?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, showAsterisk, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          label={
            <Typography>
              {`${other.label}`}{' '}
              {showAsterisk && <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>}
            </Typography>
          }
          //InputLabelProps={{ shrink: field.value }}
        />
      )}
    />
  );
}
