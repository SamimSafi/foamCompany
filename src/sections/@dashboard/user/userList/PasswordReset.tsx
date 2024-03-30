import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
import RHFTextField from '../../../../components/hook-form/RHFTextField';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import useLocales from '../../../../hooks/useLocales';
import { CreateUser, ResetPassword } from 'src/@types/createUser';
import { useMemo, useState } from 'react';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useSettings from 'src/hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/Iconify';

export default observer(function PasswordReset() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    UserStore: { selectedUser },
  } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { UserStore } = useStore();
  const { resetPassword } = UserStore;
  const validationSchema = Yup.object().shape({
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
  });
  const defaultValues = {
    id: '',
    newPassword: '',
  };
  const navigate = useNavigate();
  const methods = useForm<ResetPassword>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: ResetPassword) => {
    let newData = { ...data, id: selectedUser?.id };
    resetPassword(newData)
      .then(() => {
        enqueueSnackbar('Reset Password  success!');
        reset();
        navigate(PATH_DASHBOARD.user.list);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Failed to Reset Password! ', {
          variant: 'error',
        });
      });
  };
  const { themeStretch } = useSettings();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValue(name as  'newPassword', value);

    // Trigger form validation on change of text fields
    methods.trigger(name as 'newPassword');
  };
  return (
    <Page title={translate('User.ResetPassword')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('User.ResetPassword')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('User.user')}`, href: PATH_DASHBOARD.user.list },
          ]}
        />
        <Card sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} alignItems="flex-end">
              {/* <RHFTextField
                name="newPassword"
                type="password"
                label={translate('User.NewPassword')}
              /> */}

              <RHFTextField
                name="newPassword"
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
              <Stack direction="row" spacing={1.5} sx={{ mt: 1, ml: 0, mb: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.user.list);
                  }}
                >
                  {translate('CRUD.BackToList')}
                </Button>

                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {translate('User.ResetPassword')}
                </LoadingButton>
              </Stack>
            </Stack>
          </FormProvider>
        </Card>
      </Container>
    </Page>
  );
});
