import { useFieldArray, useFormContext } from 'react-hook-form';
// @mui
import { Stack, Button, Typography, Divider } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { useStore } from 'src/stores/store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Box } from '@mui/material';
import Iconify from '../../../../components/Iconify';
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------

export default observer(function PermissionDetail() {
  const {translate} = useLocales();
  const { control, setValue, watch } = useFormContext();

  const { PermissionStore } = useStore();
  const {
    loadControllerNameDropdown,
    ControllerActionAndMethoOption,
    getAtionAndMethodFromRegistry,
    selectedActionAndMethod,
  } = PermissionStore;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permissions',
  });
  const values = watch();

  const handleAdd = () => {
    append({
      controller: '',
      isGlobal: true,
      action: '',
      method: '',
      actionCategory: '',
      description: '',
    });
  };
  const handleRemove = (index: number) => {
    remove(index);
  };
const setValuePermission= async (index:number,controller:number)=>{
console.log(index,controller);
 await getAtionAndMethodFromRegistry(controller);
}


  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
          {translate('userRole.Permission')}:
        </Typography>
        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          {fields.map((item, index) => (
            <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                <RHFSelect
                  name={`permissions[${index}].controller`}
                  label={translate('userPermission.Controller')}
                  onChange={(e) => {
                    setValue(`permissions[${index}].controller`, e.target.value);
                    setValuePermission(index,parseInt(values.permissions[index].controller)).then(()=>{
                        setValue(`permissions[${index}].action`, selectedActionAndMethod!.action);
                        setValue(`permissions[${index}].method`, selectedActionAndMethod!.method);
                        console.log(selectedActionAndMethod);
                    });
                   

                   
                  }}
                >
                 
                  {ControllerActionAndMethoOption.map((op) => (
                     <option key={op.value} value={op.value}>{op.text}</option>
                  ))}
                </RHFSelect>
                <RHFTextField
                  size="small"
                  name={`permissions[${index}].isGlobal`}
                  label={translate('userPermission.IsGlobal')}
                  sx={{ maxWidth: { md: 96 } }}
                />
                <RHFTextField
                  size="small"
                  name={`permissions[${index}].action`}
                  label={translate('Department.Action')}
                  sx={{ maxWidth: { md: 96 } }}
                />
                <RHFTextField
                  size="small"
                  name={`permissions[${index}].method`}
                  label={translate('userRole.Method')}
                  sx={{ maxWidth: { md: 96 } }}
                />
                <RHFTextField
                  size="small"
                  name={`permissions[${index}].actionCategory`}
                  label={translate('userPermission.ActionCategory')}
                  sx={{ maxWidth: { md: 96 } }}
                />
                <RHFTextField
                  size="small"
                  name={`permissions[${index}].description`}
                  label={translate('userRole.Description')}
                  sx={{ maxWidth: { md: 96 } }}
                />
                <Button
                  size="small"
                  color="error"
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                  onClick={() => handleRemove(index)}
                />
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAdd}
            sx={{ flexShrink: 0 }}
          >
            {translate('CRUD.AddNew')}
          </Button>
        </Stack>
      </Box>
    </>
  );
});
