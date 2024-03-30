import { capitalCase } from 'change-case';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from 'src/_mock';

// sections
import {
  AccountGeneral,
  AccountChangePassword,
} from '../account';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import useTabs from 'src/hooks/useTabs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('general');

  // const ACCOUNT_TABS = [
  //   {
  //     value: 'general',
  //     icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
  //     component: <AccountGeneral />,
  //   },
  //   {
  //     value: 'change_password',
  //     icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
  //     component: <AccountChangePassword />,
  //   },
  // ];

  return (
    <Page title="User: Account Settings">
      {/* <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container> */}
    </Page>
  );
}
