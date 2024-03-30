import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
import { PermissionFormValues, permissions } from 'src/@types/permission';
import PermissionHeader from './PermissionHeader';
import PermissionDetail from './PermissionDetail';
import { FormProvider } from 'src/components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { useSnackbar } from 'notistack';
import useLocales from 'src/hooks/useLocales';
export default observer(function PermissionFrom() {

  const {translate} = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const {
    PermissionStore: { createPermission },
  } = useStore();
  const methods = useForm<PermissionFormValues>();

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const newPermissions = {
    ...values,
    permissions: values.permissions?.map((item: permissions) => ({
      ...item,
    })),
  };

  const handlesubmit = (data: PermissionFormValues) => {

    console.log(data);
    // createPermission(data).then(() => {
    //   reset();
    //   enqueueSnackbar('Create success!');
    // });
  };
  return (
    <FormProvider methods={methods}>
      <Card>
        <PermissionHeader />
        <PermissionDetail />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          onClick={handleSubmit(handlesubmit)}
        >
          {translate('userPermission.SaveAll')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
});
