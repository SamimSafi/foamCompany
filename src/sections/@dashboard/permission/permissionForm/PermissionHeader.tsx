import { observer } from 'mobx-react-lite';
import { useFormContext } from 'react-hook-form';
import { Stack, Divider, Typography, TextField } from '@mui/material';
import useResponsive from '../../../../hooks/useResponsive';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useStore } from '../../../../stores/store';
import { useEffect } from 'react';
import useLocales from 'src/hooks/useLocales';

export default observer(function PermissionHeader() {
  const {translate} = useLocales();
  const { PermissionStore } = useStore();
  const {
    loadSubControllerActionsDropdown,
    ControllerNameOption,
    loadApplicationDropdown,
    loadControllerNameDropdown,
    ApplicationNameOption,
  } = PermissionStore;

  useEffect(() => {
    loadApplicationDropdown();
  }, [loadApplicationDropdown]);
  const upMd = useResponsive('up', 'md');
  const { watch,setValue } = useFormContext();
  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          flexItem
          orientation={upMd ? 'vertical' : 'horizontal'}
          sx={{ borderStyle: 'dashed' }}
        />
      }
      sx={{ p: 3 }}
    >
      <Stack spacing={2} sx={{ width: 1 }}>
        <Stack direction="row" spacing={2}>
          <RHFSelect name="applicationId" label={translate('userPermission.ApplicationName')}>
            <option value="" />
            {ApplicationNameOption.map((op) => (
              <option key={op.value} value={op.value}>
                {op.text}
              </option>
            ))}
          </RHFSelect>
          <RHFSelect
            name="controllerName"
            label={translate('userRole.ControllerName')}
            onChange={(e) => loadSubControllerActionsDropdown(e.target.value)}
          >
            <option value="" />
            {ControllerNameOption.map((op) => (
              <option key={op.text} value={op.text}>
                {op.text}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField name="isActionCategoryMissing" label={translate('userPermission.isActionCategoryMissing')} />
        </Stack>
      </Stack>
    </Stack>
  );
});
