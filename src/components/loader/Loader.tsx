import { Box, ThemeProvider } from '@mui/system';
import ReactLoading from 'react-loading';
import useSettings from 'src/hooks/useSettings';

export default function Loader() {
  const { themeMode } = useSettings();
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
      }}
    >
      <ReactLoading
        type="bubbles"
        color={themeMode === 'light' ? 'black' : 'white'}
        height={100}
        width={50}
      />
    </Box>
  );
}
