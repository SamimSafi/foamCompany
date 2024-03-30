import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Alert, Button, Card, Container, IconButton, InputAdornment, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { RHFTextField, FormProvider } from 'src/components/hook-form';
import { useSnackbar } from 'notistack';
import useLocales from 'src/hooks/useLocales';
import { useStore } from 'src/stores/store';
import { chPassword } from 'src/@types/createUser';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useSettings from 'src/hooks/useSettings';
import Iconify from 'src/components/Iconify';
import { ChangeEvent, useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function ChangePasswordForm() {
  const { translate } = useLocales();
  const {
    UserStore,
    LoginStore: { user, logout },
  } = useStore();
  const { changePassword } = UserStore;
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const ResetPasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required(`${translate('User.CurrentPassIsRequired')}`),
    newPassword: Yup.string()
    .min(6, `${translate('User.AtLeastChar')}`)
  .matches(
    /^(?=.*[a-zA-Z])/,
    `${translate('User.NewPassRequiresAlpha')}`
  )
  .matches(
    /^(?=.*\d)/,
    `${translate('User.NewPassRequiresNumber')}`
  )
  .matches(
    /^(?=.*[@$!%*?&])/,
    `${translate('User.NewPassRequiresSpecialChar')}`
  )
  .required(`${translate('User.NewPassIsRequired')}`),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      `${translate('User.passMustMatch')}`
    ),
  });
  const defaultValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm<chPassword>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting,errors },
  } = methods;
 
  const onSubmit = (data: chPassword) => {
    let newData = { ...data, Id: user?.ID };
    if (user?.ID != undefined) {
      changePassword(newData)
        .then((res) => {
          console.log(res);
          enqueueSnackbar('Change Password  success!');
          navigate(PATH_DASHBOARD.root);
        })
        .catch((error) => {
          console.log(error);
          var json = JSON.parse(error.request.response);

        if (json.error.PasswordRequiresDigit != null) {
          setError('afterSubmit', { ...error, message: json.error.PasswordRequiresDigit });
        } 
         
        });
    }
  };

  const { themeStretch } = useSettings();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValue(name as 'currentPassword' | 'newPassword' | 'confirmNewPassword', value);

    // Trigger form validation on change of text fields
    methods.trigger(name as 'currentPassword' | 'newPassword' | 'confirmNewPassword');
  };
  return (
    <Page title={translate('User.ChangePassword')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('User.ChangePassword')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('User.user')}`, href: PATH_DASHBOARD.root},
          ]}
        />
        <Card sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {!!errors.afterSubmit && (
          <Alert sx={{ mb: 2 }} severity="error">
            {errors.afterSubmit.message}
          </Alert>
        )}
            <Stack spacing={3} alignItems="flex-end">
              <RHFTextField
                name="currentPassword"
                onChange={handleInputChange}
                label={translate('User.CurrentPassword')}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField
                name="newPassword"
                onChange={handleInputChange}
                label={translate('User.NewPassword')}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField
                name="confirmNewPassword"
                onChange={handleInputChange}
                label={translate('User.ConfirmNewPassword')}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack direction="row" spacing={1.5} sx={{ mt: 1, ml: 0, mb: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.root);
                  }}
                >
                  {translate('CRUD.BackToList')}
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  startIcon={<Iconify icon="carbon:password" />}
                >
                  {translate('User.ChangePassword')}
                </LoadingButton>
              </Stack>
            </Stack>
          </FormProvider>
        </Card>
      </Container>
    </Page>
  );
}
