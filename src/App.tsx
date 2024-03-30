// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { useStore } from './stores/store';
import { useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import { observer } from 'mobx-react-lite';
import './style.css';
import MyDialog from './components/MyDialog';
import useLocales from './hooks/useLocales';
import { AppWelcome } from './sections/@dashboard/general/app';
// ----------------------------------------------------------------------

export default observer(function App() {
  const { CommonStore, LoginStore} = useStore();
  const { translate } = useLocales();
  useEffect(() => {
    if (CommonStore.token) {
      LoginStore.getCurrentUSer().finally(() => CommonStore.setApploaded());
    } else {
      CommonStore.setApploaded();
    }
  }, [CommonStore, LoginStore]);

  if (!CommonStore.apploaded) return <LoadingScreen />;

  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <NotistackProvider>
            <ProgressBarStyle />
            <ChartStyle />
            <ScrollToTop />
            <Router />
          </NotistackProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
});
