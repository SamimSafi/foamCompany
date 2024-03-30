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
import { IContractType } from 'src/@types/foamCompanyTypes/ContractType';
import { IBranch } from 'src/@types/foamCompanyTypes/branch';
// ----------------------------------------------------------------------

export default observer(function BranchNewEditForm() {
  const { branchStore } = useStore();
  const { translate } = useLocales();
  const {
    createBranch,
    updateBranch,
    editMode,
    selectedBranch,
    clearSelectedBranch,
  } = branchStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewContractTypeSchema = Yup.object().shape({
    name: Yup.string().required(`${translate('Validation.name')}`),
    location: Yup.string().required(`${translate('Validation.location')}`),
  });

  const defaultValues = useMemo<IBranch>(
    () => ({
      id: selectedBranch?.id,
      name: selectedBranch?.name || '',
      location: selectedBranch?.location || '',
    }),
    [selectedBranch]
  );

  const methods = useForm<IBranch>({
    resolver: yupResolver(NewContractTypeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IBranch) => {
    if (data.id! === undefined) {
      ///create
      createBranch(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    } else {
      ///update
      updateBranch(data).then(() => {
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
                name="location"
                label={translate('Branch.Location')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="description"
                label={translate('Branch.Location')}
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
                  clearSelectedBranch();
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
