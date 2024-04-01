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

// ----------------------------------------------------------------------

export default observer(function SupplierNewEditForm() {
  const language = window.localStorage.getItem('i18nextLng');
  const { EmployeeStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const [isImageUpdate, setIsImageUpdated] = useState(false);
  const [muiPhone, setMuiPhone] = useState('+93');

  const cropperRef = useRef<ReactCropperElement>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [croppedImage, setCroppedImage] = useState<string>('');


  const [provinceName, setProvinceName] = useState<string | undefined>('');
  const [districtName, setDistrictName] = useState<string | undefined>('');


  const {
    createEmployee,
    updateEmployee,
    editMode,
    selectedEmployee,
    clearSelectedEmployee,
    employeeForEdit,
  } = EmployeeStore;
  const {
    loadProvinceDropdown,
    loadDistrictDropdown,
    ProvinceOption,
    DistrictOption,
  } = commonDropdown;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  // const phoneRegExp =
  //   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const NewEmployeeSchema = Yup.object().shape({
    registrationNumber: Yup.string().required(`${translate('Validation.RegistrationNumber')}`),
    englishFirstName: Yup.string().required(`${translate('Validation.EnglishName')}`),
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

  const defaultValues = useMemo<IEmployee>(
    () => ({
      id: employeeForEdit?.id,
      tazkiraTypeId: employeeForEdit?.tazkiraTypeId || 1,
      branchId: employeeForEdit?.branchId || 1,
      joldNo: employeeForEdit?.joldNo || '',
      pageNo: employeeForEdit?.pageNo || '',
      regNo: employeeForEdit?.regNo || '',
      tazkiraNo: employeeForEdit?.tazkiraNo || '',
      dateOfBirth: employeeForEdit?.dateOfBirth || new Date(),
      provinceId: employeeForEdit?.provinceId || 1,
      districtId: employeeForEdit?.districtId || undefined,
      phoneNumber: employeeForEdit?.phoneNumber || '',
      photoPath: employeeForEdit?.photoPath || undefined,
      profilePhoto: employeeForEdit?.profilePhoto || null,
      gender: employeeForEdit?.gender || '',
      name: employeeForEdit?.name || '',
      fatherName: employeeForEdit?.fatherName || '',
      age: employeeForEdit?.age || '',
      isInvestor: employeeForEdit?.isInvestor || true,
    }),
    [employeeForEdit]
  );

  const methods = useForm<IEmployee>({
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

  const onSubmit = (data: IEmployee) => {
    data.phoneNumber = muiPhone.replace(/\s+/g, '');
    if (data.id! === undefined) {
      ///create
      data.profilePhoto = methods.getValues().profilePhoto;
      createEmployee(data)
        .then(() => {
          clearSelectedEmployee();
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

      if (!isImageUpdate) {
        data.profilePhoto = null;
      } else {
        data.profilePhoto = methods.getValues().profilePhoto;
      }
      updateEmployee(data)
        .then(() => {
          clearSelectedEmployee();
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
      setMuiPhone(defaultValues.phoneNumber!);
    }
    if (!editMode) {
      loadProvinceDropdown();

      reset(defaultValues);
    }
  }, [reset, editMode, defaultValues]);

  useEffect(() => {
    if (val.provinceId) {
      loadDistrictDropdown(val.provinceId);
    }
  }, [val.provinceId]);

  useEffect(() => {
    if (editMode) {
      if (defaultValues.provinceId) {
        loadProvinceDropdown().then((res) => {
          setProvinceName(ProvinceOption.find((e) => e.value === defaultValues.provinceId)?.text);
        });
      }
    }
  }, [provinceName]);



  useEffect(() => {
    if (editMode) {
      if (defaultValues.provinceId) {
        loadDistrictDropdown(val.provinceId).then((res) => {
          setDistrictName(DistrictOption.find((e) => e.value === defaultValues.districtId)?.text);
        });
      }
    }
  }, [districtName]);



  useEffect(() => {
    setValue('provinceName', provinceName);
  }, [provinceName]);

  useEffect(() => {
    setValue('districtName', districtName);
  }, [districtName]);


  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log(file);

      setImageSrc(URL.createObjectURL(file));
      //setValue('profilePhoto',URL.createObjectURL(file))
      setCroppedImage('');
    }
  }, []);

  const handleCropImage = useCallback(() => {
    if (cropperRef.current) {
      if (editMode) {
        setIsImageUpdated(true);
      }
      const canvas = cropperRef.current?.cropper;
      if (canvas) {
        // Convert the canvas to a Blob object
        canvas.getCroppedCanvas().toBlob((blob: any) => {
          if (blob) {
            // Create a new File object with the Blob and set it as the value for 'profilePhoto'
            const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });

            setValue(
              'profilePhoto',
              Object.assign(croppedFile, {
                preview: URL.createObjectURL(croppedFile),
              })
            );

            setImageSrc('');
          }
        }, 'image/jpeg');
        // Convert the canvas to a data URL and set it as the cropped image
        const croppedDataURL = canvas.getCroppedCanvas().toDataURL();
        setCroppedImage(croppedDataURL);
      }
    }
  }, []);

  const handleCancelCrop = useCallback(() => {
    setCroppedImage('');
  }, []);

  const bloodGroup = [
    { title: 'A+', value: 'A+' },
    { title: 'A-', value: 'A-' },
    { title: 'B+', value: 'B+' },
    { title: 'B-', value: 'B-' },
    { title: 'O+', value: 'O+' },
    { title: 'O-', value: 'O-' },
    { title: 'AB+', value: 'AB+' },
    { title: 'AB-', value: 'AB-' },
  ];

  const TazkiraType = [
    { title: 1, value: `${translate('Employee.ETazkira')}` },
    { title: 2, value: `${translate('Employee.PaperBaseTazkira')}` },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errors.afterSubmit.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 13, px: 3, borderRadius: '15px 15px 15px 15px' }}>
            <Fieldset legend={translate('Employee.ProfilePhoto')}>
              {editMode && (
                <Label
                  //color={values !== 'active' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                ></Label>
              )}
              <Box sx={{ mb: 3 }}>
                <RHFUploadAvatar
                  name="profilePhoto"
                  accept="image/*"
                  onDrop={handleDrop}
                  maxSize={3145728}
                  showAsterisk={true}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      {translate('User.Allowed')}
                      <br /> {translate('User.MaxSize')} {fData(3145728)}
                    </Typography>
                  }
                />
                {imageSrc && (
                  <Box>
                    <Cropper
                      src={imageSrc}
                      style={{ width: '100%', height: '100%' }}
                      aspectRatio={16 / 16}
                      guides={true}
                      ref={cropperRef}
                    />
                    {croppedImage ? (
                      <Box>
                        <img src={croppedImage} alt="Cropped" />
                        <button onClick={() => handleCropImage()}>Cancel Crop</button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => handleCropImage()}
                      >
                        {translate('Employee.CropImage')}
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Fieldset>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
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
                <LocalizDatePicker
                  name="dateOfBirth"
                  label={translate('Employee.dateOfBirth')}
                  control={control}
                  showAsterisk={true}
                />
         
                <RHFTextField
                  name="gender"
                  label={translate('Employee.Gender')}
                  showAsterisk={true}
                />

                <MuiPhone
                  value={muiPhone}
                  dir={language === 'en' ? 'ltr' : 'ltr'}
                  onChange={(Phone) => setMuiPhone(Phone)}
                  name="phoneNumber"
                  customFlag={CustomFlag}
                />


                <RHFSelect name="branchId" label={translate('Employee.Branch')}>
                  <option value="" />
                  {bloodGroup.map((op) => (
                    <option key={op.value} value={op.title}>
                      {op.title}
                    </option>
                  ))}
                </RHFSelect>

                <RHFSelect
                  name="tazkiraTypeId"
                  label={translate('Employee.TazkiraType')}
                  onChange={(e) => setValue('tazkiraTypeId', parseInt(e.target.value))}
                >
                  <option value="" />
                  {TazkiraType.map((op) => (
                    <option key={op.title} value={op.title}>
                      {op.value}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField
                  name="tazkiraNo"
                  label={translate('Employee.cnic')}
                  showAsterisk={true}
                />

                {val.tazkiraTypeId === 2 && (
                  <>
                    <RHFTextField name="joldNo" label={translate('Employee.JoldNo')} />
                    <RHFTextField name="pageNo" label={translate('Employee.PageNo')} />
                    <RHFTextField name="regNo" label={translate('Employee.RegNo')} />
                  </>
                )}

                <CustomRHFAutocomplete
                  name="provinceName"
                  label={translate('Employee.Province')}
                  showAsterisk={true}
                  //placeholder={translate('Employee.Department')}
                  value={watch('provinceName') || ''}
                  options={ProvinceOption.map((i) => i.text)}
                  getOptionLabel={(option: any) => `${option}`}
                  onChange={(event, newValue: any) => {
                    const find = ProvinceOption.filter((item) => item.text === newValue)[0];

                    if (find) {
                      const id = find?.value;
                      setValue('provinceId', Number(id));
                      setValue(`provinceName`, find?.text);
                    } else {
                      setValue('provinceId', undefined);
                      setValue(`provinceName`, '');
                    }
                  }}
                  freeSolo
                  fullWidth
                  renderOption={(props, option: any) => {
                    return (
                      <li {...props} key={option + '-' + uuid()}>
                        {option}
                      </li>
                    );
                  }}
                />

                <CustomRHFAutocomplete
                  name="districtName"
                  label={translate('Employee.District')}
                  showAsterisk={true}
                  //placeholder={translate('Employee.Department')}
                  value={watch('districtName') || ''}
                  options={DistrictOption.map((i) => i.text)}
                  getOptionLabel={(option: any) => `${option}`}
                  onChange={(event, newValue: any) => {
                    const find = DistrictOption.filter((item) => item.text === newValue)[0];

                    if (find) {
                      const id = find?.value;
                      setValue('districtId', Number(id));
                      setValue(`districtName`, find?.text);
                    } else {
                      setValue('districtId', undefined);
                      setValue(`districtName`, '');
                    }
                  }}
                  freeSolo
                  fullWidth
                  renderOption={(props, option: any) => {
                    return (
                      <li {...props} key={option + '-' + uuid()}>
                        {option}
                      </li>
                    );
                  }}
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
                    clearSelectedEmployee();
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
