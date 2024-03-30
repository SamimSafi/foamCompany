import {
  BaseTextFieldProps,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  CountryIso2,
  defaultCountries,
  FlagEmoji,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import CustomFlag from './CustomFlags/CustomFlag';
//Localization
import useLocales from 'src/hooks/useLocales';

export interface MUIPhoneProps extends BaseTextFieldProps {
  value: string;
  onChange: (phone: string) => void;
  customFlag: any;
}

export const MuiPhone: React.FC<MUIPhoneProps> = ({
  customFlag,
  value,
  onChange,
  ...restProps
}) => {
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: 'af',
    value,
    countries: defaultCountries,
    onChange: (data:any) => {
      onChange(data.phone);
    },
  });

  const { translate } = useLocales();

  return (
    <TextField
      variant="outlined"
      label={translate('Employee.PhoneNumber')}
      color="primary"
      placeholder={translate('Employee.PhoneNumber')}
      value={phone}
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" style={{ marginRight: '2px', marginLeft: '6px' }}>
            <Select
              MenuProps={{
                style: {
                  height: '300px',
                  width: '360px',
                  top: '10px',
                  left: '-34px',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              sx={{
                width: 'max-content',
                // Remove default outline (display only on focus)
                fieldset: {
                  display: 'none',
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: 'block',
                  },
                },
                // Update default spacing
                '.MuiSelect-select': {
                  padding: '8px',
                  paddingRight: '24px !important',
                },
                svg: {
                  right: 0,
                },
              }}
              value={country}
              onChange={(e) => {
                setCountry(e.target.value as CountryIso2);
              }}
              renderValue={(value) => {
                if (value === 'af') {
                  return (
                    <img
                      src={CustomFlag.AF}
                      alt="Flag for Afghanistan"
                      style={{ width: '1.5em', height: '1.5em' }}
                    />
                  );
                } else {
                  return <FlagEmoji iso2={value} style={{ display: 'flex' }} />;
                }
              }}
            >
              {defaultCountries.map((c:any) => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    {c[2] == 'af' ? (
                      <>
                        {' '}
                        <img
                          src={CustomFlag.AF}
                          alt="Flag for Afghanistan"
                          style={{ width: '1.5em', height: '1.5em', marginRight: '8px' }}
                        />
                      </>
                    ) : (
                      <>
                        <FlagEmoji iso2={country.iso2} style={{ marginRight: '8px' }} />
                      </>
                    )}

                    <Typography marginRight="8px"> {country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};
