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
import agent from 'src/api/agent';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IEmployeePosition } from 'src/@types/EmployeePosition';
// ----------------------------------------------------------------------

export default observer(function EmployeePositionNewEditForm() {
  const { EmployeePositionStore } = useStore();
  const { translate } = useLocales();
  const {
    createEmployeePosition,
    updateEmployeePosition,
    editMode,
    selectedEmployeePosition,
    clearSelectedEmployeePosition,
  } = EmployeePositionStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewEmployeePositionSchema = Yup.object().shape({
    englishName: Yup.string().required(`${translate('Validation.EnglishName')}`),
    dariName: Yup.string().required(`${translate('Validation.DariName')}`),
    pashtoName: Yup.string().required(`${translate('Validation.PashtoName')}`),
    code: Yup.string().required(`${translate('Validation.DocCode')}`),
  });

  const defaultValues = useMemo<IEmployeePosition>(
    () => ({
      id: selectedEmployeePosition?.id,
      englishName: selectedEmployeePosition?.englishName || '',
      dariName: selectedEmployeePosition?.dariName || '',
      pashtoName: selectedEmployeePosition?.pashtoName || '',
      code: selectedEmployeePosition?.code || '',
    }),
    [selectedEmployeePosition]
  );

  const methods = useForm<IEmployeePosition>({
    resolver: yupResolver(NewEmployeePositionSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IEmployeePosition) => {
    if (data.id! === undefined) {
      ///create
      createEmployeePosition(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.EmployeePositions.list);
      });
    } else {
      ///update
      updateEmployeePosition(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.EmployeePositions.list);
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
              <RHFTextField name="englishName" label={translate('Employee.EnglishName')} autoFocus />
              <RHFTextField name="pashtoName" label={translate('Employee.PashtoName')} />
              <RHFTextField name="dariName" label={translate('Employee.DariName')} />
              <RHFTextField name="code" label={translate('Department.DocCode')} />
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
                  clearSelectedEmployeePosition();
                  navigate(PATH_DASHBOARD.EmployeePositions.list);
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
