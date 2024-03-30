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
import { deleteUser } from 'src/@types/createUser';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  id: string;
}

export default observer(function UserDelete({ id }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { UserStore } = useStore();
  const validationSchema = Yup.object().shape({
    remarks: Yup.string()
      .required(`${translate('User.PleaseEnterRmarks')}`)
      .label('Remarks'),
  });
  const methods = useForm<deleteUser>({
    resolver: yupResolver(validationSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: deleteUser) => {
    let newData = { ...data, Id: id };
    UserStore.deleteUser(newData)
      .then(() => {
        enqueueSnackbar(`${translate('Tostar.Success')}`);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`${translate('Tostar.DeleteFailed')}`, {
          variant: 'error',
        });
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Grid container spacing={4}>
          <Grid item xs={10} md={10}>
            <Box
              sx={{
                ml: 4,
                mt: 4,
                mb: 4,
              }}
            >
              <Stack spacing={2}>
                <RHFTextField
                  name="remarks"
                  label={translate('CRUD.Remarks')}
                  size="small"
                  autoFocus
                />
              </Stack>
            </Box>
            <Box
              sx={{
                ml: 4,
                mt: 4,
                mb: 4,
              }}
            >
              <Stack direction="row" spacing={3}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="error"
                  size="small"
                  loading={isSubmitting}
                  startIcon={<DeleteIcon />}
                >
                  {translate('CRUD.Delete')}
                </LoadingButton>

                <LoadingButton
                  variant="contained"
                  size="small"
                  onClick={() => UserStore.setOpenCloseDialog()}
                  startIcon={<CancelIcon />}
                >
                  {translate('CRUD.Cancle')}
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
});
