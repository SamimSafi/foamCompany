import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Card, FormControl, Grid, Stack } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect } from '../../../../components/hook-form';
import { useStore } from 'src/stores/store';
import { observer } from 'mobx-react-lite';
import useLocales from 'src/hooks/useLocales';
import { District } from 'src/@types/district';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import uuid from 'react-uuid';
// ----------------------------------------------------------------------

export default observer(function DistrictNewEditForm() {
  const [provinceName, setProvinceName] = useState<string | undefined>('');
  const { DistrictStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const { createDistrict, updateDistrict, editMode, selectedDistrict, clearSelectedDistrict } =
    DistrictStore;
  const { loadProvinceDropdown, ProvinceOption } = commonDropdown;

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewDistrictSchema = Yup.object().shape({
    englishName: Yup.string().required(`${translate('Validation.EnglishName')}`),
    dariName: Yup.string().required(`${translate('Validation.DariName')}`),
    pashtoName: Yup.string().required(`${translate('Validation.PashtoName')}`),
    provinceName: Yup.string().required(`${translate('Validation.Province')}`),
    code: Yup.string().required(`${translate('Validation.DistrictCode')}`),
  });

  const defaultValues = useMemo<District>(
    () => ({
      id: selectedDistrict?.id,
      englishName: selectedDistrict?.englishName || '',
      provinceId: selectedDistrict?.provinceId || undefined,
      dariName: selectedDistrict?.dariName || '',
      pashtoName: selectedDistrict?.pashtoName || '',
      code: selectedDistrict?.code || '',
    }),
    [selectedDistrict]
  );

  const methods = useForm<District>({
    resolver: yupResolver(NewDistrictSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: District) => {
    if (data.id! === undefined) {
      ///create
      createDistrict(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          navigate(PATH_DASHBOARD.district.list);
          clearSelectedDistrict();
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.EnglishName != null) {
            setError('afterSubmit', { ...err, message: json.error.EnglishName });
          } else if (json.error.DariName != null) {
            setError('afterSubmit', { ...err, message: json.error.DariName });
          } else if (json.errors.PashtoName != null) {
            setError('afterSubmit', { ...err, message: json.error.PashtoName });
          }
        });
    } else {
      ///update
      updateDistrict(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
          navigate(PATH_DASHBOARD.district.list);
          clearSelectedDistrict();
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.EnglishName != null) {
            setError('afterSubmit', { ...err, message: json.error.EnglishName });
          } else if (json.error.DariName != null) {
            setError('afterSubmit', { ...err, message: json.error.DariName });
          } else if (json.errors.PashtoName != null) {
            setError('afterSubmit', { ...err, message: json.error.PashtoName });
          }
        });
    }
  };

  useEffect(() => {
    loadProvinceDropdown().then((res) => {
      setProvinceName(ProvinceOption.find((e) => e.value === defaultValues.provinceId)?.text);
    });
    if (editMode) {
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);
    }
  }, [reset, editMode, defaultValues]);

  useEffect(() => {
    setValue('provinceName', provinceName);
  }, [provinceName]);

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
              <RHFTextField
                name="englishName"
                label={translate('District.EnglishName')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="pashtoName"
                label={translate('District.PashtoName')}
                showAsterisk={true}
              />
              <RHFTextField
                name="dariName"
                label={translate('District.DariName')}
                showAsterisk={true}
              />
              {/* <FormControl>
                <RHFSelect
                  name="provinceId"
                  label={translate('Province.Province')}
                  placeholder="Select Province"
                >
                  <option value="" />
                  {ProvinceOption.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </RHFSelect>
              </FormControl> */}

              <CustomRHFAutocomplete
                name="provinceName"
                label={translate('Employee.Province')}
                showAsterisk={true}
                //placeholder={translate('Employee.Department')}
                value={watch('provinceName') || ''}
                options={ProvinceOption.map((i) => i.text)}
                getOptionLabel={(option: any) => `${option}`}
                onChange={(event, newValue: any) => {
                  const find = ProvinceOption.filter((item) => item.text === newValue)[0];

                  if (find) {
                    const id = find?.value;
                    setValue('provinceId', Number(id));
                    setValue(`provinceName`, find?.text);
                  } else {
                    setValue('provinceId', undefined);
                    setValue(`provinceName`, '');
                  }
                }}
                freeSolo
                fullWidth
                renderOption={(props, option: any) => {
                  return (
                    <li {...props} key={option + '-' + uuid()}>
                      {option}
                    </li>
                  );
                }}
              />

              <RHFTextField name="code" label={translate('District.Code')} showAsterisk={true} />
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
                {!editMode ? `${translate('CRUD.Save')}` : `${translate('CRUD.Update')}`}
              </LoadingButton>
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedDistrict();
                  navigate(PATH_DASHBOARD.district.list);
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
