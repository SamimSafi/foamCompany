import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, FormControlLabel, Grid, Stack, Switch } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IPositionTitle } from 'src/@types/foamCompanyTypes/PositionTitle';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import uuid from 'react-uuid';
// ----------------------------------------------------------------------

export default observer(function PositionTitleNewEditForm() {
  const [departmentName, setDepartmentName] = useState<string | undefined>('');

  const { PositionTitleStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const {
    createPositionTitle,
    updatePositionTitle,
    editMode,
    selectedPositionTitle,
    clearSelectedPositionTitle,
  } = PositionTitleStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { loadJobPositionDDL, JobPositionOption} =
    commonDropdown;

  const NewPositionTitleSchema = Yup.object().shape({
    name: Yup.string().required(`${translate('Validation.name')}`),
   
  });

  const defaultValues = useMemo<IPositionTitle>(
    () => ({
      id: selectedPositionTitle?.id,
      name: selectedPositionTitle?.name || '',
    }),
    [selectedPositionTitle]
  );

  const methods = useForm<IPositionTitle>({
    resolver: yupResolver(NewPositionTitleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IPositionTitle) => {
    if (data.id! === undefined) {
      ///create
      createPositionTitle(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.PositionTitle.list);
      });
    } else {
      ///update
      updatePositionTitle(data).then(() => {
        clearSelectedPositionTitle();
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.PositionTitle.list);
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
             
              <RHFSelect
                name="branchId"
                label={translate('JobPosition.Branch')}
                showAsterisk={true}
              >
                <option value="" />
                {JobPositionOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
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
                {!editMode ? `${translate('CRUD.Save')}` : `${translate('CRUD.Update')}`}
              </LoadingButton>
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedPositionTitle();
                  navigate(PATH_DASHBOARD.PositionTitle.list);
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
