import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IJobPosition } from 'src/@types/JobPosition';
// ----------------------------------------------------------------------

export default observer(function JobPositionNewEditForm() {
  const { JobPositionStore } = useStore();
  const { translate } = useLocales();
  const {
    createJobPosition,
    updateJobPosition,
    editMode,
    selectedJobPosition,
    clearSelectedJobPosition,
  } = JobPositionStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewJobPositionSchema = Yup.object().shape({
    englishName: Yup.string().required(`${translate('Validation.EnglishName')}`),
    dariName: Yup.string().required(`${translate('Validation.DariName')}`),
    pashtoName: Yup.string().required(`${translate('Validation.PashtoName')}`),
    code: Yup.string().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<IJobPosition>(
    () => ({
      id: selectedJobPosition?.id,
      englishName: selectedJobPosition?.englishName || '',
      dariName: selectedJobPosition?.dariName || '',
      pashtoName: selectedJobPosition?.pashtoName || '',
      code: selectedJobPosition?.code || '',
    }),
    [selectedJobPosition]
  );

  const methods = useForm<IJobPosition>({
    resolver: yupResolver(NewJobPositionSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IJobPosition) => {
    if (data.id! === undefined) {
      ///create
      createJobPosition(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.JobPosition.list);
      });
    } else {
      ///update
      updateJobPosition(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.JobPosition.list);
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
                label={translate('GeneralFields.EnglishName')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="pashtoName"
                label={translate('GeneralFields.PashtoName')}
                showAsterisk={true}
              />
              <RHFTextField
                name="dariName"
                label={translate('GeneralFields.DariName')}
                showAsterisk={true}
              />
              <RHFTextField
                name="code"
                label={translate('GeneralFields.Code')}
                showAsterisk={true}
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
                  clearSelectedJobPosition();
                  navigate(PATH_DASHBOARD.JobPosition.list);
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
