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
// @types
import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IUnitOfMeasure } from 'src/@types/foamCompanyTypes/unitOfMeasure';
// ----------------------------------------------------------------------

export default observer(function MeasurementNewEditForm() {
  const { uniteOfMeasureStore } = useStore();
  const { translate } = useLocales();
  const {
    createuniteOfMeasure,
    updateuniteOfMeasure,
    editMode,
    selecteduniteOfMeasure,
    clearSelecteduniteOfMeasure,
  } = uniteOfMeasureStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewContractTypeSchema = Yup.object().shape({
    name: Yup.string().required(`${translate('Validation.name')}`),
  });

  const defaultValues = useMemo<IUnitOfMeasure>(
    () => ({
      id: selecteduniteOfMeasure?.id,
      name: selecteduniteOfMeasure?.name || '',
      description: selecteduniteOfMeasure?.description || '',
    }),
    [selecteduniteOfMeasure]
  );

  const methods = useForm<IUnitOfMeasure>({
    resolver: yupResolver(NewContractTypeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IUnitOfMeasure) => {
    if (data.id! === undefined) {
      ///create
      createuniteOfMeasure(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    } else {
      ///update
      updateuniteOfMeasure(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
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
                name="name"
                label={translate('GeneralFields.Name')}
                showAsterisk={true}
                autoFocus
              />          
              <RHFTextField
                name="description"
                label={translate('Branch.description')}
                showAsterisk={true}
                multiline
                minRows={4}
                maxRows={8}
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
                  clearSelecteduniteOfMeasure();
                  navigate(PATH_DASHBOARD.ContractType.list);
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
