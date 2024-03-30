import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Card, Grid, Stack } from '@mui/material';
import useLocales from 'src/hooks/useLocales';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { ILanguage } from '../../../../@types/language';

// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { useStore } from 'src/stores/store';
import { observer } from 'mobx-react-lite';
import { response } from 'src/@types/common';
// ----------------------------------------------------------------------

export default observer(function LanguageNewEditForm() {
  const { LanguageStore } = useStore();
  const { createLanguage, updateLanguage, editMode, selectedLanugage, clearSelectedLanguage } =
    LanguageStore;
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [response, setResponse] = useState('');

  const NewLanguageSchema = Yup.object().shape({
    name: Yup.string().required(`${translate('Validation.Language')}`),
  });

  const defaultValues = useMemo<ILanguage>(
    () => ({
      id: selectedLanugage?.id,
      name: selectedLanugage?.name || '',
    }),
    [selectedLanugage]
  );

  const methods = useForm<ILanguage>({
    resolver: yupResolver(NewLanguageSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;

  const onSubmit = (data: ILanguage) => {
    if (data.id! === undefined) {
      ///create
      createLanguage(data)
        .then((res) => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          console.log(res);
          navigate(PATH_DASHBOARD.Language.list);
          clearSelectedLanguage();
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message === 'Network Error') {
            setResponse('Network Disconnected Please Contact Network Administrator!');
          } else {
            // console.log(response + '  errors' + err.request.response);doneThanks
            setResponse('');
            var json = JSON.parse(err.request.response);
            //setError('afterSubmit', { ...err, message: json.error.Name})
            if (json.error.Name != '') {
              setError('afterSubmit', { ...err, message: json.error.Name });
            }
          }
        });
    } else {
      ///update
      updateLanguage(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
          navigate(PATH_DASHBOARD.Language.list);
          clearSelectedLanguage();
        })
        .catch((err) => {
          // console.log(err[0].Error);
          // if(err){
          //   setResponse("Network Disconnected Please Contact Network Administrator!");
          //   console.log("Network Disconnected Please Contact Network Administrator!")

          // } else{
          // console.log(response + '  errors' + err.request.response);doneThanks
          var json = JSON.parse(err.request.response);
          //setError('afterSubmit', { ...err, message: json.error.Name})
          if (json.error.Name != '') {
            setError('afterSubmit', { ...err, message: json.error.Name });
          }
          //}
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
      {response && (
        <Alert sx={{ mb: 2 }} severity="error">
          {response}
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
                name="name"
                label={translate('Language.Language')}
                showAsterisk={true}
                autoFocus
              />
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
                  clearSelectedLanguage();
                  navigate(PATH_DASHBOARD.Language.list);
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
