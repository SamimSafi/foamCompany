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
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';

import { IInvestor } from 'src/@types/foamCompanyTypes/investor';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------

export default observer(function InvestorNewEditForm() {
  const { investorStore,commonDropdown } = useStore();
  const { loadEmployeeDropdown,EmployeeOption } =
    commonDropdown;
  const { translate } = useLocales();
  const {
    createInvestor,
    updateInvestor,
    editMode,
    selectedInvestor,
    clearSelectedInvestor,
  } = investorStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewContractTypeSchema = Yup.object().shape({
    employeeId: Yup.number().required(`${translate('Validation.name')}`),
    percentOfInvest: Yup.string().required(`${translate('Validation.percentOfInvest')}`),
    startDate: Yup.date().required(`${translate('Validation.startDate')}`),
    endDate: Yup.date().required(`${translate('Validation.startDate')}`),
  });

  const defaultValues = useMemo<IInvestor>(
    () => ({
      id: selectedInvestor?.id,
      employeeId: selectedInvestor?.employeeId || undefined,
      percentOfInvest: selectedInvestor?.percentOfInvest || '',
      startDate: selectedInvestor?.startDate || new Date(),
      endDate: selectedInvestor?.endDate || new Date(),
    }),
    [selectedInvestor]
  );

  const methods = useForm<IInvestor>({
    resolver: yupResolver(NewContractTypeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IInvestor) => {
    if (data.id! === undefined) {
      ///create
      createInvestor(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    } else {
      ///update
      updateInvestor(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    }
  };

  useEffect(() => {
    loadEmployeeDropdown(true);
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
                <RHFSelect
                name="employeeId"
                label={translate('JobPosition.Branch')}
                showAsterisk={true}
              >
                <option value="" />
                {EmployeeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="percentOfInvest"
                label={translate('investor.percentOfInvest')}
                showAsterisk={true}
                autoFocus
              />
                <LocalizDatePicker
                name="startDate"
                label={translate('GeneralFields.StartDate')}
                showAsterisk={true}
                control={control}
              />
                <LocalizDatePicker
                name="endDate"
                label={translate('GeneralFields.StartDate')}
                showAsterisk={true}
                control={control}
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
                  clearSelectedInvestor();
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
