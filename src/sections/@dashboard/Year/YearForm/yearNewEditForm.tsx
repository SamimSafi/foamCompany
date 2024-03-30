import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import { Alert, Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { YearInterface } from '../../../../@types/Year';
import AdapterJalali from '@date-io/date-fns-jalali';
// components
import Iconify from '../../../../components/Iconify';

import { FormProvider, RHFSelect } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import useLocales from 'src/hooks/useLocales';
import { faIR } from 'date-fns-jalali/locale';

// ----------------------------------------------------------------------

export default observer(function YearNewEditForm() {
  const { YearStore } = useStore();
  const { translate } = useLocales();
  const { createYear, updateYear, editMode, selectedYear, clearSelectedYear } = YearStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = useState<string>('');

  const NewYearSchema = Yup.object().shape({
    yearShamsi: Yup.string().required(`${translate('Validation.Year')}`),
    setDefault: Yup.string()
      .nullable()
      .required(`${translate('Validation.setDefault')}`),
  });

  const defaultValues = useMemo<YearInterface>(
    () => ({
      id: selectedYear?.id || undefined,
      yearShamsi: selectedYear?.yearShamsi || '',
      setDefault: selectedYear?.setDefault || null,
    }),
    [selectedYear]
  );

  const methods = useForm<YearInterface>({
    resolver: yupResolver(NewYearSchema),
    defaultValues,
  });

  // getting only year
  const handleDateChange = (date: any) => {
    setDate(date.getFullYear());
  };

  const {
    reset,
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = (data: YearInterface) => {
    let newData = { ...data, yearShamsi: date };
    console.log(date);
    if (newData.id! === undefined) {
      //create
      createYear(newData)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          navigate(PATH_DASHBOARD.Year.list);
          clearSelectedYear();
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          setError('afterSubmit', { ...err, message: json.error.YearShamsi });
          console.log(err.request.response);
        });
    } else {
      ///update
      updateYear(newData)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
          navigate(PATH_DASHBOARD.Year.list);
          clearSelectedYear();
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          setError('afterSubmit', { ...err, message: json.error.YearShamsi });
          console.log(err.request.response);
        });
    }
  };

  useEffect(() => {
    if (editMode) {
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);
    }
  }, [reset, editMode, defaultValues]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errors.afterSubmit.message}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterJalali} adapterLocale={faIR}>
                <Controller
                  name="yearShamsi"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      views={['year']}
                      label={
                        <Typography>
                          {translate('Year.Year')}{' '}
                          {<span style={{ color: 'red', fontWeight: 'bold' }}> *</span>}
                        </Typography>
                      }
                      value={field.value}
                      onChange={(newValue) => {
                        handleDateChange(newValue);
                        field.onChange(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>

              {/* <Controller
                name="yearShamsi"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Document Date"
                    views={['year']}
                    value={field.value}
                    //disablePast
                    onChange={(newValue) => {
                      handleDateChange(newValue);
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              /> */}

              <RHFSelect
                name="setDefault"
                label={translate('Year.SetDefault')}
                showAsterisk={true}
                InputLabelProps={{ shrink: true }}
              >
                <option> {translate('Visitor.SelectOption')} </option>
                <option value="true">{translate('CRUD.Yes')}</option>
                <option value="false">{translate('CRUD.No')}</option>
              </RHFSelect>
            </Box>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={isSubmitting}
                startIcon={
                  !editMode ? <Iconify icon="eva:plus-fill" /> : <Iconify icon="eva:edit-fill" />
                }
              >
                {!editMode ? `${translate('CRUD.Create')}` : `${translate('CRUD.Update')}`}
              </LoadingButton>
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedYear();
                  navigate(PATH_DASHBOARD.Year.list);
                }}
              >
                {translate('CRUD.BackToList')}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
