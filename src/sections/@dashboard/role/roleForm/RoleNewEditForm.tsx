import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { IRole } from '../../../../@types/role';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect, RHFEditor } from '../../../../components/hook-form';
import { useStore } from 'src/stores/store';
import { observer } from 'mobx-react-lite';
import useLocales from 'src/hooks/useLocales';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import uuid from 'react-uuid';
// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default observer(function RoleNewEditForm() {
  const { translate } = useLocales();

  const [permit, setPermit] = useState<any>([]);
  const [applicationName, setApplicationName] = useState<string | undefined>('');

  const [selectedPermission, setSelectedPermission] = useState<string[]>();
  const [newPermissionOptions, setNewPermissionOptions] = useState<any[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setPermit(typeof value === 'string' ? value.split(',') : value);
  };

  const { RoleStore, commonDropdown } = useStore();
  const {loadPermissionDropdown, PermissionOption } =
    commonDropdown;
  const {
    createRole,
    updateRole,
    editMode,
    selectedRole,
    selectedRoleDetail,
    clearSelectedRole,
    Permissions,
  } = RoleStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewRoleSchema = Yup.object()
    .noUnknown()
    .shape({
      name: Yup.string().required(`${translate('userRole.NameIsRequired')}`),
      // applicationId: Yup.string().required(`${translate('userRole.AppIsRequired')}`),
      applicationName: Yup.string().required(`${translate('userRole.AppIsRequired')}`),
      description: Yup.string().required(`${translate('userRole.DescriptionIsRequired')}`),
    });

  const ids = selectedRoleDetail?.permissions.map((role) => role.id);

  const defaultValues = useMemo<IRole>(
    () => ({
      id: selectedRole?.id,
      name: selectedRole?.name || '',
      applicationId: selectedRole?.applicationId,
      description: selectedRole?.description || '',
      totalPermissions: selectedRole?.totalPermissions || '',
      application: selectedRole?.application || '',
      permissionIds: selectedRole?.permissionIds,
    }),
    [selectedRole]
  );

  const methods = useForm<IRole>({
    resolver: yupResolver(NewRoleSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;
  const val = watch();
  const onSubmit = (data: IRole) => {
    const newData = {
      ...data,
      permissionIds: permit,
      applicationId: val.applicationId,
      // ids: permit,
    };

    if (selectedRole?.id! === undefined) {
      //   ///create
      console.log(data.id);
      createRole(newData).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.Role.list);
      });
    } else {
      const newData = {
        ...data,
        permissionIds: permit,
        id: selectedRole?.id,
        applicationId: val.applicationId,
      };
      //update

      updateRole(newData).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.Role.list);
      });
    }
  };

  useEffect(() => {
    loadPermissionDropdown(val.applicationId!);
  }, [val.applicationId]);

  useEffect(() => {
    if (editMode) {
      setPermit(ids);
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);
    }
  }, [reset, editMode, defaultValues]);

  //new code added
  const loadPermissions = () => {
    loadPermissionDropdown(val.applicationId!).then((res) => {
      if (editMode) {
        const selectedPermissions = PermissionOption.filter((e) =>
          // actionRequestIds!.includes(e.value.toString())
          ids!.includes(Number(e.value))
        );
        setTimeout(() => {
          const permissionNames = selectedPermissions.map((actionrequest) => actionrequest.text);
          console.log(permissionNames + 'test');
          setSelectedPermission(permissionNames);
        }, 500);
        setNewPermissionOptions(PermissionOption.map((i) => i.text));

        //setValue('actionRequestNames', actionRequestNames);
      }
    });
  };

  useEffect(() => {
    if (editMode) {
      if (defaultValues.applicationId) {
      
        loadPermissions();
      }
    }
  }, [applicationName]);
  useEffect(() => {
    //if(editMode)
    setValue('applicationName', applicationName);
  }, [applicationName]);

  //new code added

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField
                  name="name"
                  label={translate('userRole.Name')}
                  showAsterisk={true}
                  type="text"
                  autoFocus
                />

                {/* <RHFSelect name="applicationId" label={translate('userRole.Application')}>
                  <option value="Please Select" />
                  {ApplicationOption.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.text}
                    </option>
                  ))}
                </RHFSelect> */}

            
                <RHFTextField
                  name="description"
                  label={translate('userRole.Description')}
                  showAsterisk={true}
                />

                {/* <Controller
                  name="permissionIds"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      freeSolo
                      value={field.value!}
                      onChange={(event, newValue) => {field.onChange(newValue)}}
                      options={Permissions.map((option) => option)}
                      getOptionLabel={(options)=>options.text}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option.value}
                            size="small"
                            label={option.text}
                          />
                        ))
                      }
                      renderInput={(params) => <TextField label="Permissions" {...params} />}
                    />
                  )}
                /> */}
                {/* <FormControl>
                  <InputLabel id="demo-multiple-name-label">
                    {translate('userRole.Permission')}
                  </InputLabel>
                  <Select
                    name="permissionIds"
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={permit}
                    onChange={handleChange}
                    input={<OutlinedInput label="Permissions" />}
                    MenuProps={MenuProps}
                  >
                    {PermissionOption.map((per) => (
                      <MenuItem
                        key={per.value}
                        value={per.value}
                        // style={getStyles(name, personName, theme)}
                      >
                        {per.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

                <CustomRHFAutocomplete
                  value={selectedPermission || []}
                  multiple
                  loading={PermissionOption.length > 0 ? false : true}
                  onFocus={() => {
                    if (!editMode) {
                      loadPermissionDropdown(val.applicationId!)
                        .then((res) => {
                          setTimeout(() => {
                            setNewPermissionOptions(PermissionOption.map((i) => i.text));
                          }, 1000);
                        })
                        .finally(() => {
                          setNewPermissionOptions(PermissionOption.map((i) => i.text));
                        });
                    }
                  }}
                  name="permissionNames"
                  label={translate('userRole.Permission')}
                  options={['Select All', ...newPermissionOptions]}
                  getOptionLabel={(option: any) => `${option}`}
                  onChange={(event, newValue: any) => {
                    console.log(newValue);
                    if (newValue.includes('Select All')) {
                      setSelectedPermission(newPermissionOptions);
                      setPermit(PermissionOption.map((d) => d.value));
                    } else {
                      setSelectedPermission(newValue);
                      const selectedPermissionlist = newValue
                        .map((res: any) => {
                          const find = PermissionOption.find((item) => item.text === res);
                          if (find) {
                            return find.value.toString();
                          } else {
                            return null;
                          }
                        })
                        .filter((role: any) => role !== null);

                      setPermit(selectedPermissionlist);
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
                  {!editMode
                    ? `${translate('userRole.CreateRole')}`
                    : `${translate('userRole.UpdateRole')}`}
                </LoadingButton>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  onClick={() => {
                    clearSelectedRole();
                    navigate(PATH_DASHBOARD.Role.list);
                  }}
                >
                  {translate('CRUD.BackToList')}
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
});
