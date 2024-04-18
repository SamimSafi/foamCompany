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
import { IGoods } from '../../../../@types/foamCompanyTypes/Goods';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------

export default observer(function GoodsNewEditForm() {
  const { GoodsStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const { createGoods, updateGoods, editMode, selectedGoods, clearSelectedGoods } = GoodsStore;
  const navigate = useNavigate();
  const { loadContractTypeDDL, ContractTypeOption } = commonDropdown;
  const { enqueueSnackbar } = useSnackbar();

  const NewContractTypeSchema = Yup.object().shape({
    englishName: Yup.string().required(`${translate('Validation.EnglishName')}`),
    dariName: Yup.string().required(`${translate('Validation.PashtoName')}`),
    pashtoName: Yup.string().required(`${translate('Validation.DariName')}`),
  });

  const defaultValues = useMemo<IGoods>(
    () => ({
      id: selectedGoods?.id,
      englishName: selectedGoods?.englishName || '',
      dariName: selectedGoods?.dariName || '',
      pashtoName: selectedGoods?.pashtoName || '',
      unitofmeasureId: selectedGoods?.unitofmeasureId || undefined,
      price: selectedGoods?.price || undefined,
      categoryTypeId: selectedGoods?.categoryTypeId || undefined,
      isPurchase: selectedGoods?.isPurchase || false,
      expireDate: selectedGoods?.expireDate || new Date(),
      description: selectedGoods?.description || '',
    }),
    [selectedGoods]
  );

  const methods = useForm<IGoods>({
    resolver: yupResolver(NewContractTypeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IGoods) => {
    if (data.id! === undefined) {
      ///create
      createGoods(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    } else {
      ///update
      updateGoods(data).then(() => {
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

  useEffect(() => {
    loadContractTypeDDL();
  }, [loadContractTypeDDL]);

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
                autoFocus
              />
              <RHFTextField
                name="dariName"
                label={translate('Branch.DariName')}
                showAsterisk={true}
                autoFocus
              />
              <RHFSelect name="unitofmeasureId" label={translate('Goods.Unit')} showAsterisk={true}>
                <option value="" />
                {ContractTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField
                name="price"
                label={translate('Goods.Price')}
                showAsterisk={true}
                autoFocus
              />
              <LocalizDatePicker
                name="expireDate"
                label={translate('GeneralFields.StartDate')}
                showAsterisk={true}
                control={control}
              />

              <RHFSelect
                name="categoryTypeId"
                label={translate('Goods.category')}
                showAsterisk={true}
              >
                <option value="" />
                {ContractTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="description"
                label={translate('GeneralFields.Description')}
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
                  clearSelectedGoods();
                  navigate(PATH_DASHBOARD.Goods.list);
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
