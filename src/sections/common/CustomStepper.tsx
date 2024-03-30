import {
  Box,
  Button,
  Card,
  MenuItem,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterJalali from '@date-io/date-fns-jalali';
import faIR from 'date-fns-jalali/esm/locale/fa-IR';
import enUS from 'date-fns-jalali/esm/locale/en-US';
import faJalaliIR from 'date-fns-jalali/esm/locale/fa-jalali-IR';
import AdapterHijri from '@date-io/hijri';

import { useState } from 'react';
import { RHFTextField, RHFSelect } from 'src/components/hook-form';
import LocalizDatePicker from './LocalizDatePicker';

interface Props {
  control?: any;
  label?: any;
  name?: any;
  Content?: any;
  expand?: any;
  handleChange: (val: any) => void;
}

export default function CustomStepper({
  control,
  label,
  name,
  Content,
  expand,
  handleChange,
}: Props) {
  const getlanguageFromLocalStorage = localStorage.getItem('i18nextLng');

  const [open, setOpen] = useState(false);

  return (
    <Step expanded={true}>
      <StepLabel
        optional={
          // index === 2 ? (
          <Typography variant="caption">{label}</Typography>
          // ) : null
        }
      >
        {/* {step.label} */}
      </StepLabel>

      <StepContent>
        <Card sx={{ p: 2, borderBottom: '1px solid gray' }}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 4,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(4, 1fr)' },
            }}
          >
            <Content />
            {/* <LocalizDatePicker
                name="startDate"
                label="Start Date"
                control={control}
                size="small"
                isDisablePast={false}
              />
              <LocalizDatePicker
                name="endDate"
                label="End Date"
                control={control}
                size="small"
                isDisablePast={false}
              />
              <RHFTextField
                size="small"
                name="activityImplementationSource"
                label="activity Implementation Source"
                autoFocus
              />

              <RHFSelect
                fullWidth
                name="select"
                label="Select"
                size="small"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                onChange={(event) => handleChange(event.target.value)}
              >
                <MenuItem
                  value="1"
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  Initial Survey
                </MenuItem>
                <MenuItem
                  value="2"
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  Technical Survey
                </MenuItem>
                <MenuItem
                  value="3"
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  Design
                </MenuItem>
              </RHFSelect>
              <RHFTextField size="small" name="remarks" label="Remark" /> */}
          </Box>
          {/* <Typography>{step.description}</Typography> */}
          <Box sx={{ mb: 2 }}>
            <div>
              {/* onClick={handleNext} */}
              <Button size="small" variant="contained" sx={{ mt: 1, mr: 1 }}>
                Create
                {/* {index === steps.length - 1 ? 'Finish' : 'Continue'} */}
              </Button>
              {/* <Button
                            // disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button> */}
            </div>
          </Box>
        </Card>
      </StepContent>
    </Step>
  );
}
