// @mui
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
// routes
// assets
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { translate } = useLocales();

  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <DocIllustration sx={{ width: 1 }} />

      {/* <div>
        <Typography gutterBottom variant="subtitle1">
          {translate('docs.hi')}, Adminddd
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
          {translate('docs.description')}
        </Typography>
      </div> */}

     
    </Stack>
  );
}
