import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { SendVerificationCode } from 'src/@types/login';
import { useStore } from 'src/stores/store';
import { useState } from 'react';
// localization
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const { LoginStore } = useStore();
  const [errors, setErrors] = useState<string | undefined>();
  const { translate } = useLocales();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${translate('login.EmailMustBe')}`)
      .required(`${translate('login.EmailIsRequired')}`),
  });

  const methods = useForm<SendVerificationCode>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });
  const handleChange = (e: any) => {
    if (errors) {
      setErrors(undefined);
    }
    setValue('email', e.target.value);
  };
  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const onSubmit = async (data: SendVerificationCode) => {
    setErrors(undefined);
    await LoginStore.SendVerificationCode(data)
      .then(() => {
        navigate(PATH_AUTH.newPassword);
      })
      .catch((err) => {
        setErrors(translate('login.EmailNotExist'));
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {errors != undefined && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errors}
        </Alert>
      )}

      <Stack spacing={3}>
        <RHFTextField
          name="email"
          label={translate('login.EmailAddress')}
          onChange={(e) => handleChange(e)}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {translate('login.SendRequest')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
