import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Alert,
} from '@mui/material';
import { newDate } from 'date-fns-jalali';
import Typography from '@mui/material/Typography';
import { faJalaliIR } from 'date-fns-jalali/locale';
import { enUS, faIR } from 'date-fns/locale';
import { size } from 'lodash';
import AdapterJalali from '@date-io/date-fns-jalali';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
import { IContractDetails } from 'src/@types/foamCompanyTypes/ContractDetails';
import useLocalStorage from 'src/hooks/useLocalStorage';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import uuid from 'react-uuid';
import Label from 'src/components/Label';
// ----------------------------------------------------------------------

export default observer(function ContractDetailsNewEditForm() {
  const { ContractDetailsStore, commonDropdown } = useStore();
  const [EmpData] = useLocalStorage('DetailsData', null);
  const [checked, setChecked] = useState(false);
  const { translate } = useLocales();

  const [departmentName, setDepartmentName] = useState<string | undefined>('');
  const [positionTitleName, setPositionTitleName] = useState<string | undefined>('');

  const {
    createContractDetails,
    updateContractDetails,
    editMode,
    selectedContractDetails,
    clearSelectedContractDetails,
    EmpCurrentContractDetails,

    clearSelectedCurrentContractDetails,
  } = ContractDetailsStore;
  const [contractType, setContractType] = useState(0);
  const {
    loadContractTypeDDL,
    ContractTypeOption,
    loadPositionTitleDDL,
    PositionTitleOption,
    loadJobPositionDDL,
    JobPositionOption,
  } = commonDropdown;

  const navigate = useNavigate();
  const currentDate = new Date();
  const contractEndDate = new Date(EmpCurrentContractDetails?.endDate!);
  const isButtonDisabled = currentDate.getTime() < contractEndDate.getTime();
  const { enqueueSnackbar } = useSnackbar();

  const NewContractDetailsSchema = Yup.object().shape({
    // contractTypeId: Yup.string().required(`${translate('Validation.contractType')}`),
    // positionTitleId: Yup.string().required(`${translate('Validation.positionTitle')}`),
    // gradeId: Yup.string().required(`${translate('Validation.grade')}`),
    // gradeStepId: Yup.string().required(`${translate('Validation.gradeStep')}`),
    // departmentName: Yup.string().required(`${translate('Validation.Directorate')}`),
    // startDate: Yup.date().required(`${translate('Validation.StartDate')}`),
    // endDate:
    //   contractType !== 19 || editMode != false
    //     ? Yup.date().required(`${translate('Validation.EndDate')}`)
    //     : Yup.date(),
  });

  const defaultValues = useMemo<IContractDetails>(
    () => ({
      id: selectedContractDetails?.id,
      employeeProfileId: EmpData?.id || undefined,
      contractTypeId:
        selectedContractDetails?.contractTypeId ||
        EmpCurrentContractDetails?.contractTypeId ||
        undefined,
      positionTitleId:
        selectedContractDetails?.positionTitleId ||
        EmpCurrentContractDetails?.positionTitleId ||
        undefined,
      // jobPositionId:
      //   selectedContractDetails?.jobPositionId ||
      //   EmpCurrentContractDetails?.jobPositionId ||
      //   undefined,
      startDate:
        selectedContractDetails?.startDate || EmpCurrentContractDetails?.startDate || new Date(),
      endDate: selectedContractDetails?.endDate || EmpCurrentContractDetails?.endDate || undefined,
      isCurrent: selectedContractDetails?.isCurrent || true,
      remarks: selectedContractDetails?.remarks || '',
    }),
    [selectedContractDetails, EmpData]
  );

  const methods = useForm<IContractDetails>({
    resolver: yupResolver(NewContractDetailsSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    setValue,
    watch,
    resetField,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const val = watch();

  // const [contractType, setContractType] = useState(0);

  const onSubmit = (data: IContractDetails) => {
    data.positionTitleId = val.positionTitleId;

    if (data.id! === undefined) {
      ///create
      createContractDetails(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          navigate(PATH_DASHBOARD.ContractDetails.list);
        })
        .catch((err) => {
          console.log(err);
          var json = JSON.parse(err.request.response);

          if (json.error.EmployeeProfileId != null) {
            setError('afterSubmit', {
              ...err,
              message: json.error.EmployeeProfileId,
            });
          }
        });
    } else {
      ///update
      updateContractDetails(data)
        .then(() => {
          clearSelectedContractDetails();
          reset();
          enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
          navigate(PATH_DASHBOARD.ContractDetails.list);
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);

          if (json.error.EmployeeProfileId != null) {
            setError('afterSubmit', {
              ...err,
              message: json.error.EmployeeProfileId,
            });
          } else if (json.error.EndDate != null) {
            setError('afterSubmit', {
              ...err,
              message: json.error.EndDate,
            });
          }
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
  }, [reset, editMode, defaultValues, EmpData]);

  useEffect(() => {
    loadContractTypeDDL();
  }, [loadContractTypeDDL, loadPositionTitleDDL, loadJobPositionDDL, val.contractTypeId]);

  useEffect(() => {
    setValue('positionTitleName', positionTitleName);
  }, [positionTitleName]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (val.contractTypeId == 19 && editMode !== true) {
      resetField('endDate');
    }
  };
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
              <RHFSelect
                name="contractTypeId"
                label={translate('ContractType.ContractType')}
                showAsterisk={true}
                onChange={(e) => {
                  setContractType(parseInt(e.target.value));
                  setValue('contractTypeId', parseInt(e.target.value));
                }}
              >
                <option value="" />
                {ContractTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect
                name="positionTitleId"
                label={`${translate('PositionTitle.PositionTitle')}` + ' ' + '*'}
                // onChange={(e) => handleDocumentType(parseInt(e.target.value))}
              >
                <option value="" />
                {PositionTitleOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              {/* <RHFSelect
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
              </RHFSelect> */}
              {/* <RHFTextField name="salaryPerHour" label={translate('GeneralFields.Remarks')} /> */}

              <LocalizDatePicker
                name="startDate"
                label={translate('GeneralFields.StartDate')}
                showAsterisk={true}
                control={control}
              />

              <LocalizDatePicker
                name="endDate"
                label={translate('GeneralFields.EndDate')}
                showAsterisk={true}
                control={control}
              />
              <RHFTextField name="remarks" label={translate('GeneralFields.Remarks')} />
              <Controller
                name="isCurrent"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // Notify React Hook Form of the value change
                          handleChange(e); // Handle the switch state change
                        }}
                        checked={field.value}
                      />
                    }
                    label={translate('Employee.isCurrent')}
                    labelPlacement="end"
                  />
                )}
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
                disabled={!editMode && isButtonDisabled}
              >
                {!editMode ? `${translate('CRUD.Save')}` : `${translate('CRUD.Update')}`}
              </LoadingButton>

              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedContractDetails();

                  navigate(PATH_DASHBOARD.ContractDetails.list);
                }}
              >
                {translate('CRUD.BackToList')}
              </Button>
            </Stack>
            <Stack direction="row">
              {isButtonDisabled && !editMode && (
                <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: 'red', mt: 1 }}>
                  {translate('ContractDetails.ContractWarning')}
                </Typography>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
