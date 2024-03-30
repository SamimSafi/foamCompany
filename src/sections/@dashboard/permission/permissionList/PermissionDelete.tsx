import { Box, Card, Grid, Stack } from '@mui/material';
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

interface Props {
  id: number;
}

export default observer(function PermissionDelete({ id }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { RoleStore } = useStore();
  const validationSchema = Yup.object().shape({
    remarks: Yup.string().required('Please Enter Remarks').label('Remarks'),
  });
  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (remark: string) => {
    RoleStore.deleteRole(id, remark)
      .then(() => { 
        enqueueSnackbar('Delete  success!');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Failed to delete ', {
          variant: 'error',
        });
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Grid container spacing={4}>
          <Grid item>
            <Box
              sx={{
                ml: 4,
                mt: 2,
                mb: 2,
              }}
            >
              <Stack spacing={2}>
                <RHFTextField name="remarks" label={translate('CRUD.Remarks')} size="small" />
              </Stack>
            </Box>
            <Box
              sx={{
                ml: 4,
                mt: 2,
                mb: 2,
              }}
            >
              <Stack direction="row" spacing={3}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="error"
                  size="small"
                  loading={isSubmitting}
                >
                  Delete
                </LoadingButton>

                <LoadingButton
                  variant="contained"
                  size="small"
                  onClick={() => RoleStore.setOpenCloseDialog()}
                >
                  Cancel
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
});
