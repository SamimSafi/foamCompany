import * as Yup from 'yup';
import { useState, useMemo, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { observer } from 'mobx-react-lite';
//import LoginStore from '../../../stores/Login/loginStore';
import { useStore } from '../../../stores/store';
import { useSnackbar } from 'notistack';
import { LoginFormValue } from '../../../@types/login';
//localization
import useLocales from 'src/hooks/useLocales';

export default observer(function LoginForm() {
  const { translate } = useLocales();
  const { LoginStore,} = useStore();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().required(`${translate('User.UserNameIsRequired')}`),
    password: Yup.string().required(`${translate('User.PasswordIsRequired')}`),
  });

  const defaultValues = {
    userName: '',
    password: '',
    remember: true,
  };

  const methods = useForm<LoginFormValue>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: LoginFormValue) => {
    try {
      await LoginStore.login(data);
      navigate(PATH_DASHBOARD.root);
      enqueueSnackbar(`${translate('Tostar.LoginSuccess')}`);
    } catch (error) {
      reset();
      console.log(error);
      
      setError('afterSubmit', { ...error, message: error.request.responseText });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="userName" label={translate('login.UserName')} autoFocus />
        <RHFTextField
          name="password"
          label={translate('login.Password')}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="rememberMe" label={translate('login.RememberMe')} />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          {translate('login.ForgotPassword')}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {translate('login.Login')}
      </LoadingButton>
    </FormProvider>
  );
});
