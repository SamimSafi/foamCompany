// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label: string;
  children: any;
  defaultValue?: string;
  showAsterisk?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFSelect({
  name,
  children,
  label,
  defaultValue,
  showAsterisk,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''} // Set the default value for the select input
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          label={
            <Typography>
              {label} {showAsterisk && <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>}
            </Typography>
          }
          value={field.value || ''}
          SelectProps={{ native: true, defaultValue: defaultValue || '' }}
          InputLabelProps={{ shrink: field.value }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
