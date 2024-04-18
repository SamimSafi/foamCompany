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
import React from 'react';
import { IExpense } from 'src/@types/foamCompanyTypes/Expense';
// ----------------------------------------------------------------------

export default observer(function ExpenseNewEditForm() {
  const {
    ExpenseStore,
    commonDropdown: { loadExpenseTypeDropdown, ExpenseTypeOption },
  } = useStore();
  const { translate } = useLocales();
  const { createExpense, updateExpense, editMode, selectedExpense, clearSelectedExpense } =
    ExpenseStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewContractTypeSchema = Yup.object().shape({
    expenseTypeId: Yup.number().required(`${translate('Validation.expenseType')}`),
    amount: Yup.number().required(`${translate('Validation.amount')}`),
  });

  const defaultValues = useMemo<IExpense>(
    () => ({
      id: selectedExpense?.id,
      expenseTypeId: selectedExpense?.expenseTypeId || undefined,
      amount: selectedExpense?.amount || undefined,
      description: selectedExpense?.description || '',
    }),
    [selectedExpense]
  );

  const methods = useForm<IExpense>({
    resolver: yupResolver(NewContractTypeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IExpense) => {
    if (data.id! === undefined) {
      ///create
      createExpense(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    } else {
      ///update
      updateExpense(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    }
  };

  useEffect(() => {
    loadExpenseTypeDropdown();
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
                name="expenseTypeId"
                label={translate('Expense.ExpenseType')}
                showAsterisk={true}
              >
                <option value="" />
                {ExpenseTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="amount"
                label={translate('Expense.Amount')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="description"
                label={translate('GeneralFields.description')}
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
                  clearSelectedExpense();
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
