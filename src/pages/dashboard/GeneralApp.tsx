import { Box, Container, Divider, Fab, Grid, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import { useStore } from 'src/stores/store';
import ArchiveDashboard from 'src/sections/@dashboard/archiveDashboard/ArchiveDashboard';
import MisWorkDashboard from './MisWorkDashboard';

import DashboardWidget from './DashboardWidget';
import Loader from 'src/components/loader/Loader';
//localization
import useLocales from 'src/hooks/useLocales';
import UserPerformenceDashboard from 'src/sections/@dashboard/userPerformenceDashboard/UserPerformenceDashboard';
import UserDashboard from 'src/sections/@dashboard/userDashboard/UserDashboard';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Button from '@mui/material/Button';
import { AppWelcome } from 'src/sections/@dashboard/general/app';
import { SeoIllustration, SpeakerIllustration } from 'src/assets';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { warning } from 'react-router/lib/router';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
import NewsCard from 'src/sections/@dashboard/general/app/NewsCard';
import { blue, green } from '@mui/material/colors';
import { Color } from 'react-push-notification/dist/notifications/Storage';
import { ColorSchema } from 'src/theme/palette';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { translate } = useLocales();

  const {
    userPerformenceDashboardStore,
    userDashboardStore,
  } = useStore();
  const [showButton, setShowButton] = useState(false);

  const { getLoggedInUsersDashboard } = userPerformenceDashboardStore;

  const { getUserSummaryByDepartment } = userDashboardStore;

  const { themeStretch } = useSettings();

  const [receptionDashboard, setReceptionDashboard] = useState<boolean>(false);

  const [misDashboard, setMisDashboard] = useState<boolean>(false);

  const [archiveDashboard, setArchiveDashboard] = useState<boolean>(false);

  const [internalDashboard, setInternalDashboard] = useState<boolean>(false);

  const [externalDashboard, setExternalDashboard] = useState<boolean>(false);

  const [userPerformenceDashboard, setUserPerformenceDashboard] = useState<boolean>(false);

  const [userDashboard, setUserDashboard] = useState<boolean>(false);

  const [hrDashboard, setHRDashboard] = useState<boolean>(false);

  const [itsmsDashboard, setItsmsDashboard] = useState<boolean>(false);

  const [isloading, setIsloading] = useState(false);

  const [showWelcomeGrid, setShowWelcomeGrid] = useState(true);

  const handleReceptionDashboard = (reception: boolean) => {
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setUserPerformenceDashboard(false);
    setUserDashboard(false);
    setItsmsDashboard(false);
    setHRDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setReceptionDashboard(reception);
    setShowWelcomeGrid(false);
  };
  const handleHRDashboard = (HR: boolean) => {
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setUserPerformenceDashboard(false);
    setHRDashboard(HR);
    setItsmsDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setReceptionDashboard(false);
    setShowWelcomeGrid(false);
  };

  const handleMisDashboard = (mis: boolean) => {
    setArchiveDashboard(false);
    setReceptionDashboard(false);
    setInternalDashboard(false);
    setItsmsDashboard(false);
    setExternalDashboard(false);
    setHRDashboard(false);
    setUserDashboard(false);
    setUserPerformenceDashboard(false);
    setShowButton(true);
    setMisDashboard(mis);
    setShowWelcomeGrid(false);
  };
  const handleArchiveDashboard = (archive: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setItsmsDashboard(false);
    setHRDashboard(false);
    setUserPerformenceDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setArchiveDashboard(archive);
    setShowWelcomeGrid(false);
  };

  const handleInternalDocumentDashboard = (internal: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setExternalDashboard(false);
    setHRDashboard(false);
    setUserPerformenceDashboard(false);
    setItsmsDashboard(false);
    setHRDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setInternalDashboard(internal);
    setShowWelcomeGrid(false);
  };

  const handleExternalDocumentDashboard = (external: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setUserPerformenceDashboard(false);
    setItsmsDashboard(false);
    setHRDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setExternalDashboard(external);
    setShowWelcomeGrid(false);
  };

  const handleUserPerformenceDashboard = (user: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setHRDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setItsmsDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setUserPerformenceDashboard(user);
    setShowWelcomeGrid(false);
  };

  const handleUserDashboard = (user: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setHRDashboard(false);
    setExternalDashboard(false);
    setUserPerformenceDashboard(false);
    setItsmsDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setUserDashboard(user);
    setShowWelcomeGrid(false);
  };

  const handleITSMSDashboard = (itsms: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setHRDashboard(false);
    setUserPerformenceDashboard(false);
    setUserDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setItsmsDashboard(itsms);
    setShowWelcomeGrid(false);
  };


  useEffect(() => {
    if (userPerformenceDashboard) {
      getLoggedInUsersDashboard().then((res) => {
        setTimeout(() => {
          setIsloading(false);
        }, 1000);
      });
    }
  }, [userPerformenceDashboard]);

  useEffect(() => {
    if (userDashboard) {
      getUserSummaryByDepartment().then((res) => {
        setTimeout(() => {
          setIsloading(false);
        }, 1000);
      });
    }
  }, [userDashboard]);



  const renderDashboard = () => {
    if (misDashboard) {
      return (
        <>
          {' '}
          <MisWorkDashboard />
        </>
      );
    }

    else if (userPerformenceDashboard && isloading) {
      return (
        <>
          <Loader />
        </>
      );
    } else if (userPerformenceDashboard === true && isloading === false) {
      return (
        <>
          <UserPerformenceDashboard />
        </>
      );
    } else if (userDashboard === true && isloading) {
      return (
        <>
          <Loader />
        </>
      );
    } else if (userDashboard === true && isloading === false) {
      return (
        <>
          <UserDashboard />
        </>
      );
    } 
  };

  const positionToColor: ColorSchema[] = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ];

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* {showButton ? (
          <>
            <Button
              sx={{ mb: 1 }}
              color="primary"
              size="small"
              onClick={() => setShowButton(false)}
            >
              <KeyboardDoubleArrowLeftIcon /> Back
            </Button>
          </>
        ) : (
          <></>
        )} */}
        {/* -----------------------Welcome Componenet------------------------- */}
       
        {showWelcomeGrid && (
          <>
            <Grid item xs={12} md={12}>
              <AppWelcome
                title={translate('Welcome.Title')}
                description={translate('Welcome.Text')}
                img={
                  <SeoIllustration
                    sx={{
                      p: 3,
                      width: 360,
                      margin: { xs: 'auto', md: 'inherit' },
                    }}
                  />
                }
                // action={<Button variant="contained">Go Now</Button>}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} mt={1} mb={3}>
              <Divider sx={{ borderStyle: 'dashed', borderWidth: 1.5 }} />
            </Grid>
          </>
        )}
        {/* -----------------------Dashboard Componenets------------------------- */}
        {/* <Box sx={{ gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' } }}> */}
        <Grid container spacing={2}>
          {!showButton ? (
            <>
              <Grid
                sx={{ cursor: 'pointer' }}
                item
                xs={12}
                md={4}
                onClick={() => {
                  misDashboard == false && handleMisDashboard(true);
                }}
              >
                <DashboardWidget
                  color={positionToColor[0]}
                  title={translate('Dashboard.MISWorkDashboard')}
                  icon={'mdi:apps'}
                />
              </Grid>
              <PermissionBasedGuard
                permissions={[
                  'ExternalDocumentDashBoardsAndReport-ByLogginUserProcessStatusAndDocumentType',
                  'InternalDocumentDashBoardsAndReport-ByLogginUserProcessStatusAndDocumentType',
                  'ArchiveReportAndDashboard-DashBoardByLoggedInUserAndDocumentType',
                ]}
              >
                <Grid
                  sx={{ cursor: 'pointer' }}
                  item
                  xs={12}
                  md={4}
                  onClick={() => {
                    userPerformenceDashboard == false && handleUserPerformenceDashboard(true);
                  }}
                >
                  <DashboardWidget
                    color={positionToColor[1]}
                    title={translate('Dashboard.UserPerformanceDashboard')}
                    icon={'mdi:account-cog'}
                  />
                </Grid>
              </PermissionBasedGuard>
              <PermissionBasedGuard
                permissions={['UserReportsAndDashboard-EachAndTotalUserInDepartmentDashBoard']}
              >
                <Grid
                  sx={{ cursor: 'pointer' }}
                  item
                  xs={12}
                  md={4}
                  onClick={() => {
                    userDashboard == false && handleUserDashboard(true);
                  }}
                >
                  <DashboardWidget
                    color="warning"
                    title={translate('Dashboard.UserSummaryDashboard')}
                    icon={'mdi:account-details'}
                  />
                </Grid>
              </PermissionBasedGuard>
              <PermissionBasedGuard
                permissions={[
                  'ReceptionReportAndDashboard-ByDayAndVisitor',
                  'ReceptionReportAndDashboard-ByCurrantDayVisitorInOutAndDepartment',
                ]}
              >
                <Grid
                  sx={{ cursor: 'pointer' }}
                  item
                  xs={12}
                  md={4}
                  onClick={() => {
                    receptionDashboard == false && handleReceptionDashboard(true);
                  }}
                >
                  <DashboardWidget
                    color={positionToColor[2]}
                    title={translate('Dashboard.ReceptionDashboard')}
                    icon={'material-symbols:nest-doorbell-visitor-outline'}
                  />
                  {/* {showWelcomeGrid && (
                  <>
                    <Grid item xs={12} md={12}>
                      <AppWelcome
                        title={translate('Welcome.Title')}
                        description={translate('Welcome.Text')}
                        img={
                          <SeoIllustration
                            sx={{
                              p: 3,
                              width: 360,
                              margin: { xs: 'auto', md: 'inherit' },
                            }}
                          />
                        }
                        // action={<Button variant="contained">Go Now</Button>}
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} mt={1} mb={1}>
                      <Divider sx={{ borderStyle: 'dashed', borderWidth: 1.5 }} />
                    </Grid>
                  </>
                )} */}
                </Grid>
              </PermissionBasedGuard>
              <PermissionBasedGuard
                permissions={[
                  'ArchiveReportAndDashboard-GetReports',
                  'ArchiveReportAndDashboard-DashBoardByDateUserAndDocumentType',
                  'ArchiveReportAndDashboard-DashBoardByLoggedInUserAndDocumentType',
                ]}
              >
                <Grid
                  sx={{ cursor: 'pointer' }}
                  item
                  xs={12}
                  md={4}
                  onClick={() => {
                    archiveDashboard == false && handleArchiveDashboard(true);
                  }}
                >
                  <DashboardWidget
                    color={positionToColor[3]}
                    title={translate('Dashboard.ArchiveDashboard')}
                    icon={'mdi:archive'}
                  />
                </Grid>
              </PermissionBasedGuard>
              <PermissionBasedGuard
                permissions={[
                  'InternalDocumentDashBoardsAndReport-GetReports',
                  'InternalDocumentDashBoardsAndReport-ByLogginUserProcessStatusAndDocumentType',
                  'InternalDocumentDashBoardsAndReport-ByUserAndProcessStatusDashboard',
                  'InternalDocumentDashBoardsAndReport-ByUserBeforeBeforeLineDashBoard',
                  'InternalDocumentDashBoardsAndReport-ByUserBeforeAfterLineDashBoard',
                ]}
              >
                <Grid
                  sx={{ cursor: 'pointer' }}
                  item
                  xs={12}
                  md={4}
                  onClick={() => {
                    internalDashboard == false && handleInternalDocumentDashboard(true);
                  }}
                >
                  <DashboardWidget
                    color="info"
                    title={translate('Dashboard.InternalDocumentDashboard')}
                    icon={'fluent:document-arrow-down-16-filled'}
                  />
                </Grid>
              </PermissionBasedGuard>

              <PermissionBasedGuard
                permissions={[
                  'ExternalDocumentDashBoardsAndReport-GetReports',
                  'ExternalDocumentDashBoardsAndReport-ByLogginUserProcessStatusAndDocumentType',
                  'ExternalDocumentDashBoardsAndReport-ByUserAndProcessStatusDashboard',
                  'ExternalDocumentDashBoardsAndReport-ByUserBeforeBeforeLineDashBoard',
                  'ExternalDocumentDashBoardsAndReport-ByUserBeforeAfterLineDashBoard',
                ]}
              >
                <Grid
                  sx={{ cursor: 'pointer' }}
                  item
                  xs={12}
                  md={4}
                  onClick={() => {
                    externalDashboard == false && handleExternalDocumentDashboard(true);
                  }}
                >
                  <DashboardWidget
                    color={positionToColor[4]}
                    title={translate('Dashboard.ExternalDocumentDashboard')}
                    icon={'fluent:document-arrow-up-16-filled'}
                  />
                </Grid>
              </PermissionBasedGuard>

              <PermissionBasedGuard
                permissions={[
                  'ITSMSDashBoardsAndReports-ByRequestCategoriesBeforeAndAfterDeadLine',
                  'ITSMSDashBoardsAndReports-ByUserBeforeAndAfterDeadLine',
                  'ITSMSDashBoardsAndReports-ByDayAndVisitor',
                  'ITSMSDashBoardsAndReports-ByDepartmentPendingRequest',
                ]}
              >
                <Grid
                  sx={{ cursor: 'pointer' }}
                  item
                  xs={12}
                  md={4}
                  onClick={() => {
                    itsmsDashboard == false && handleITSMSDashboard(true);
                  }}
                >
                  <DashboardWidget
                    color="secondary"
                    title={translate('Dashboard.ITSMSDashboard')}
                    icon={'mdi:local-area-network-pending'}
                  />
                </Grid>
              </PermissionBasedGuard>

              <PermissionBasedGuard
                permissions={[
                  'Dashboard-EmpHasUserSpiderChart',
                  'Dashboard-ActiveEmplyeesPieChart',
                ]}
              >
                <Grid
                  sx={{ cursor: 'pointer' }}
                  item
                  xs={12}
                  md={4}
                  onClick={() => {
                    hrDashboard == false && handleHRDashboard(true);
                  }}
                >
                  <DashboardWidget
                    color="primary"
                    title={translate('HRDashboard.HRDashboard')}
                    icon={'clarity:employee-group-solid'}
                  />
                </Grid>
              </PermissionBasedGuard>
              <Grid item xs={12} md={12} lg={12}>
                <Divider sx={{ borderStyle: 'dashed', borderWidth: 1.5 }} />
              </Grid>
            </>
          ) : (
            <></>
          )}

          {renderDashboard()}
        </Grid>
        {/* </Box> */}
      </Container>
    </Page>
  );
}
