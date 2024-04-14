import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DatePicker, LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Alert,
  makeStyles,
} from '@mui/material';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
import { convertPersianNumberToEnlgish } from 'src/utils/convertPersianNumber';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IEmployee } from 'src/@types/foamCompanyTypes/Employee';
import Label from 'src/components/Label';
import { fData } from 'src/utils/formatNumber';
import { BasePickerProps } from '@mui/x-date-pickers/internals';

import { MuiPhone } from 'src/sections/@dashboard/MuiPhone';
import CustomFlag from '../../CustomFlags/CustomFlag';
import Fieldset from 'src/utils/fieldSet';
import { styled } from '@mui/material';

import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import Autocomplete from '@mui/material/Autocomplete';
import React from 'react';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import uuid from 'react-uuid';
import { ISupplier } from 'src/@types/foamCompanyTypes/Supplier';

// ----------------------------------------------------------------------

export default observer(function SupplierNewEditForm() {
  const language = window.localStorage.getItem('i18nextLng');
  const { supplierStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const [muiPhone, setMuiPhone] = useState('+93');

  const { createSupplier, updateSupplier, editMode, selectedSupplier, clearSelectedSupplier } =
    supplierStore;
  const { loadProvinceDropdown, loadDistrictDropdown, ProvinceOption, DistrictOption } =
    commonDropdown;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  // const phoneRegExp =
  //   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const NewEmployeeSchema = Yup.object().shape({
    name: Yup.string().required(`${translate('Validation.Name')}`),
    fatherName: Yup.string().required(`${translate('Validation.FatherName')}`),
    pashtoFirstName: Yup.string().required(`${translate('Validation.PashtoName')}`),
    englishSurName: Yup.string().required(`${translate('Validation.EnglishSurName')}`),
    pashtoSurName: Yup.string().required(`${translate('Validation.PashtoSurName')}`),
    englishFatherName: Yup.string().required(
      `${translate('Validation.FatherEnglishNameIsRequired')}`
    ),
    pashtoFatherName: Yup.string().required(`${translate('Validation.FatherDariNameIsRequired')}`),
    englishGrandFatherName: Yup.string().required(`${translate('Validation.GrandFatherEnglish')}`),
    pashtoGrandFatherName: Yup.string().required(`${translate('Validation.GrandFatherPashto')}`),
    tazkiraNo: Yup.string().required(`${translate('Validation.CNIC')}`),
    dateOfBirth: Yup.date().required(`${translate('Validation.DateOfBirth')}`),
    temporaryAddress: Yup.string().required(`${translate('Validation.TemporaryAddress')}`),
    permenantAddress: Yup.string().required(`${translate('Validation.PermanentAddress')}`),
    attendanceId: Yup.number().required(`${translate('Validation.AttendanceId')}`),
    provinceName: Yup.string().required(`${translate('Validation.Province')}`),
    districtName: Yup.string().required(`${translate('Validation.District')}`),
    healthStatusName: Yup.string().required(`${translate('Validation.EmployeeHealthStatus')}`),
    departmentName: !editMode
      ? Yup.string().required(`${translate('Validation.Directorate')}`)
      : Yup.string(),
    genderId: Yup.string().required(`${translate('Validation.Gender')}`),
    // bloodGroup: Yup.string().required(`${translate('Validation.BloodGroup')}`),
    joinDate: Yup.date().required(`${translate('Validation.JoinDate')}`),
    // personalEmail: Yup.string()
    //   .email()
    //   .required(`${translate('Validation.PersonalEmail')}`),
    // officialEmail: Yup.string()
    //   .email()
    //   .required(`${translate('Validation.OfficialEmail')}`),
    // phoneNumber: Yup.string()
    //   .matches(phoneRegExp, `${translate('User.NumberFormat')}`)
    //   .matches(/^\+937[0-9]{8}$/, `${translate('User.NumberFormat')}`)
    //   .length(12, 'Phone Number must be 12 digit')
    //   .required('Phone Number is required'),
    // emergencyPhoneNumber: Yup.string()
    //   .matches(phoneRegExp, `${translate('User.NumberFormat')}`)
    //   // .matches(/^\+937[0-9]{8}$/, `${translate('User.NumberFormat')}`)
    //   // .length(12, 'Phone Number must be 12 digit')
    //   .required('Phone Number is required'),
    // rfidNumber: Yup.string().required(`${translate('Validation.RFID')}`),
    isCurrent: !editMode
      ? Yup.boolean().required(`${translate('Validation.isCurrent')}`)
      : Yup.string(),
    // profilePhoto: !editMode
    //   ? Yup.string()
    //       .nullable()
    //       .required(`${translate('Validation.ProfilePhoto')}`)
    //   : Yup.string(),
  });

  const defaultValues = useMemo<ISupplier>(
    () => ({
      id: selectedSupplier?.id,
      name: selectedSupplier?.name || '',
      fatherName: selectedSupplier?.fatherName || '',
      email: selectedSupplier?.email || '',
      phone: selectedSupplier?.phone || '',
      location: selectedSupplier?.location || '',
      branchId: selectedSupplier?.branchId || undefined,
    }),
    [selectedSupplier]
  );

  const methods = useForm<ISupplier>({
    resolver: yupResolver(NewEmployeeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const val = watch();

  const onSubmit = (data: ISupplier) => {
    if (data.id! === undefined) {
      ///create
      createSupplier(data)
        .then(() => {
          clearSelectedSupplier();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          navigate(PATH_DASHBOARD.Employee.list);
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.PersonalEmail != null) {
            setError('afterSubmit', { ...err, message: json.error.PersonalEmail });
          } else if (json.error.OfficialEmail != null) {
            setError('afterSubmit', { ...err, message: json.error.OfficialEmail });
          } else if (json.error.PhoneNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.PhoneNumber });
          } else if (json.error.EmergencyPhoneNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.EmergencyPhoneNumber });
          } else if (json.error.LeaveDate != null) {
            setError('afterSubmit', { ...err, message: json.error.LeaveDate });
          } else if (json.error.AttendanceId != null) {
            setError('afterSubmit', { ...err, message: json.error.AttendanceId });
          } else if (json.error.TazkiraTypeId != null) {
            setError('afterSubmit', { ...err, message: json.error.TazkiraTypeId });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
          console.log(err);
        });
    } else {
      ///update

      updateSupplier(data)
        .then(() => {
          clearSelectedSupplier();
          enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
          navigate(PATH_DASHBOARD.Employee.list);
        })
        .catch((err) => {
          console.log(err);
          var json = JSON.parse(err.request.response);
          if (json.error.PersonalEmail != null) {
            setError('afterSubmit', { ...err, message: json.error.PersonalEmail });
          } else if (json.error.OfficialEmail != null) {
            setError('afterSubmit', { ...err, message: json.error.OfficialEmail });
          } else if (json.error.PhoneNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.PhoneNumber });
          } else if (json.error.EmergencyPhoneNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.EmergencyPhoneNumber });
          } else if (json.error.LeaveDate != null) {
            setError('afterSubmit', { ...err, message: json.error.LeaveDate });
          } else if (json.error.AttendanceId != null) {
            setError('afterSubmit', { ...err, message: json.error.AttendanceId });
          } else if (json.error.TazkiraTypeId != null) {
            setError('afterSubmit', { ...err, message: json.error.TazkiraTypeId });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
          console.log(err);
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, borderRadius: '15px 15px 15px 15px' }}>
            <Fieldset legend={translate('Employee.EnglishBioData')}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  // display: 'flex',
                }}
              >
                <RHFTextField
                  name="name"
                  label={translate('Employee.EnglishName')}
                  showAsterisk={true}
                  autoFocus
                />
                <RHFTextField
                  name="fatherName"
                  label={translate('Employee.englishSurName')}
                  showAsterisk={true}
                />
              </Box>
            </Fieldset>

            <Fieldset legend={translate('Employee.EmployeeGeneralInfo')}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                }}
              >
                <RHFTextField
                  name="email"
                  label={translate('Employee.email')}
                  showAsterisk={true}
                />

                <MuiPhone
                  value={muiPhone}
                  dir={language === 'en' ? 'ltr' : 'ltr'}
                  onChange={(Phone) => setMuiPhone(Phone)}
                  name="phone"
                  customFlag={CustomFlag}
                />

                <RHFSelect name="branchId" label={translate('Employee.Branch')}>
                  <option value="" />
                  {DistrictOption.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.text}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField
                  name="location"
                  label={translate('Employee.cnic')}
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
                    clearSelectedSupplier();
                    navigate(PATH_DASHBOARD.Employee.list);
                  }}
                >
                  {translate('CRUD.BackToList')}
                </Button>
              </Stack>
            </Fieldset>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
