import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { VerifyVerificationCode } from 'src/@types/login';
import { useStore } from 'src/stores/store';
import { Typography } from '@mui/material';
// localization
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ValueNames = 'code1' | 'code2' | 'code3' | 'code4';

export default function NewPasswordForm() {
  const navigate = useNavigate();
  const { LoginStore } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const [showPassword, setShowPassword] = useState(false);

  const emailRecovery = localStorage.getItem('email-recovery');
  const userID = localStorage.getItem('user-id');

  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .min(6, `${translate('login.PasswordMustBe')}`)
      .required(`${translate('login.PasswordIsRequired')}`).matches(
        /^(?=.*\d)/,
        `${translate('User.NewPassRequiresNumber')}`
      )
      .matches(
        /^(?=.*[@$!%*?&])/,
        `${translate('User.NewPassRequiresSpecialChar')}`
      )
      .required(`${translate('User.NewPassIsRequired')}`),
    confirmPassword: Yup.string()
      .required(`${translate('login.ConfirmPassword')}`)
      .oneOf([Yup.ref('password'), null], `${translate('login.PasswordMatch')}`),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    email: emailRecovery || '',
    password: '',
    confirmPassword: '',
  };
  const [error, setError] = useState<string | undefined>();
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    const target = document.querySelector('input.field-code');

    target?.addEventListener('paste', handlePaste);

    return () => {
      target?.removeEventListener('paste', handlePaste);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyCode = async (data: VerifyVerificationCode) => {
    await LoginStore.VerifyVerificationCode(data)
      .then((res) => {
        setIsCodeVerified(true);
      })
      .catch((err) => {
        setError(translate('login.InvalidCode'));
      });
  };

  const handlePaste = (event: any) => {
    if (error) {
      setError(undefined);
    }
    let data = event.clipboardData.getData('text');

    data = data.split('');

    [].forEach.call(document.querySelectorAll('.field-code'), (node: any, index) => {
      node.value = data[index];

      const fieldIndex = `code${index + 1}`;

      setValue(fieldIndex as ValueNames, data[index]);
    });

    event.preventDefault();
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValue(name as 'password' | 'confirmPassword', value);

    // Trigger form validation on change of text fields
    methods.trigger(name as 'password'  | 'confirmPassword');
  };
  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 4) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

        if (nextfield !== null) {
          (nextfield as HTMLElement).focus();
        }
      }
    }
    if (error) {
      setError(undefined);
    }
    handleChange(event);
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await LoginStore.ResetPassword({
        id: userID,
        email: emailRecovery,
        verificationCode: `${data.code1}${data.code2}${data.code3}${data.code4}`,
        newPassword: data.password,
      });

      localStorage.removeItem('email-recovery');
      localStorage.removeItem('user-id');

      enqueueSnackbar(translate('tostar.ChangePassword'));

      navigate(PATH_AUTH.login, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error != undefined && (
        <Alert sx={{ mb: 2 }} severity="error">
          {error}
        </Alert>
      )}
      <Typography variant="h3" gutterBottom>
        {translate('login.RequestSent')}
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        {translate('login.WeHaveSent')}

        <br />
        {translate('login.PleaseEnter')}
      </Typography>

      <Stack spacing={3} sx={{ mt: 5 }}>
        {!isCodeVerified && (
          <>
            <RHFTextField
              name="email"
              label={translate('login.EmailAddress')}
              disabled={!!emailRecovery}
            />

            <Stack direction="row" spacing={2} justifyContent="center">
              {['code1', 'code2', 'code3', 'code4'].map((name, index) => (
                <Controller
                  key={name}
                  name={`code${index + 1}` as ValueNames}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <OutlinedInput
                      {...field}
                      error={!!error}
                      autoFocus={index === 0}
                      placeholder="-"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeWithNextField(event, field.onChange)
                      }
                      inputProps={{
                        className: 'field-code',
                        maxLength: 1,
                        sx: {
                          p: 0,
                          textAlign: 'center',
                          width: { xs: 36, sm: 56 },
                          height: { xs: 36, sm: 56 },
                        },
                      }}
                    />
                  )}
                />
              ))}
            </Stack>
            {(!!errors.code1 || !!errors.code2 || !!errors.code3 || !!errors.code4) && (
              <FormHelperText error sx={{ px: 12 }}>
                {translate('Validation.Code')}
              </FormHelperText>
            )}
            <Stack direction="row" spacing={2} justifyContent="center">
              <LoadingButton
                size="large"
                type="button"
                variant="contained"
                sx={{
                  p: 0,
                  textAlign: 'center',
                  width: { xs: 300, sm: 300 },
                  height: { xs: 40, sm: 40 },
                }}
                onClick={() => {
                  verifyCode({
                    email: emailRecovery,
                    verificationCode: `${methods.getValues('code1')}${methods.getValues(
                      'code2'
                    )}${methods.getValues('code3')}${methods.getValues('code4')}`,
                  });
                }}
              >
                {translate('login.VerifyCode')}
              </LoadingButton>
            </Stack>
          </>
        )}

        {isCodeVerified && (
          <>
            <RHFTextField
              name="password"
              onChange={handleInputChange}
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

            <RHFTextField
              name="confirmPassword"
              onChange={handleInputChange}
              label={translate('login.ConfirmNewPassword')}
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

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ mt: 3 }}
            >
              {translate('login.ChangePassword')}
            </LoadingButton>
          </>
        )}
      </Stack>
    </FormProvider>
  );
}
