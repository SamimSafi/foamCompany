// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps, TextField, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  showAsterisk?: boolean;
}

export default function CustomRHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  helperText,
  showAsterisk,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { value, onChange } = field;
        return (
          <Autocomplete
            value={value}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                label={
                  <Typography>
                    {label}{' '}
                    {showAsterisk && <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>}
                  </Typography>
                }
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...params}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
}
