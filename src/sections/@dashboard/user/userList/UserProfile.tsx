import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from 'src/_mock';
// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
import { useStore } from 'src/stores/store';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// sections
import { Profile, ProfileCover } from 'src/sections/@dashboard/user/profile';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useTabs from 'src/hooks/useTabs';
//Localization
import useLocales from 'src/hooks/useLocales';
import { useParams } from 'react-router';
import Loader from 'src/components/loader/Loader';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  const {
    UserStore: { SelecteduserDetail },
    LoginStore: { user, logout },
    UserStore,
  } = useStore();

  const { loadProfile } = UserStore;

  const { id } = useParams();

  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (id != null) {
      loadProfile().then(() => {
        setIsloading(true);
        setTimeout(() => {
          setIsloading(true);
        }, 1000);
      });
    } else {
      setIsloading(true);
    }
  }, [id]);

  const { currentTab, onChangeTab } = useTabs('General Information');

  const PROFILE_TABS = [
    {
      value: 'General Information',
      //label: `${translate('User.GeneralInfo')}`,
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={SelecteduserDetail!} />,
    },
  ];

  return (
    <Page title={translate('User.ProfileTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {isloading ? (
          <>
            <HeaderBreadcrumbs
              heading={translate('User.Profile')}
              links={[
                { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
                { name: `${translate('User.user')}`, href: PATH_DASHBOARD.user.root },
                { name: user?.UserName || '' },
              ]}
            />

            <Card
              sx={{
                mb: 3,
                height: 280,
                position: 'relative',
              }}
            >
              <ProfileCover myProfile={SelecteduserDetail!} />

              <TabsWrapperStyle>
                <Tabs
                  allowScrollButtonsMobile
                  variant="scrollable"
                  scrollButtons="auto"
                  value={currentTab}
                  onChange={onChangeTab}
                >
                  {PROFILE_TABS.map((tab) => (
                    <Tab
                      disableRipple
                      key={tab.value}
                      value={tab.value}
                      icon={tab.icon}
                      label={translate('User.GeneralInfo')}
                    />
                  ))}
                </Tabs>
              </TabsWrapperStyle>
            </Card>

            {PROFILE_TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </>
        ) : (
          <Loader></Loader>
        )}
      </Container>
    </Page>
  );
}
