import { noCase } from 'change-case';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  BadgeProps,
  styled,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _notifications } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useEffect, useState } from 'react';
import { useStore } from 'src/stores/store';
import { baseUrl } from 'src/api/baseUrl';
import { themeMode } from 'src/utils/general';
import { translateRect } from '@fullcalendar/common';
import useLocales from 'src/hooks/useLocales';
import BadgeStatus from 'src/components/BadgeStatus';
import Loader from 'src/components/loader/Loader';
// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { translate } = useLocales();
  
  const [notifications, setNotifications] = useState(_notifications);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState<HTMLElement | null>(null);
  
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };
  const [loading, setLoading] = useState(false);

  const [pageSize, setPageSize] = useState(5);

  const handleClose = () => {
    setOpen(null);
  };
  const LoadMore = () => {
    setPageSize((prevPageSize) => prevPageSize + 5);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };


  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  // const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  //   '& .MuiBadge-badge': {
  //     right: -3,
  //     top: 13,
  //     border: `2px solid ${theme.palette.background.paper}`,
  //     padding: '0 4px',
  //   },
  // }));

  return (
    <>
      <IconButtonAnimate>
        <Badge badgeContent={10} color={'error'} onClick={handleOpen}>
          <Iconify
            color={open ? 'primary' : 'default'}
            sx={{ color: themeMode() === 'light' ? 'darkgray' : 'lightgray' }}
            icon="eva:bell-fill"
            width={20}
            height={20}
          />
        </Badge>
      </IconButtonAnimate>
      {/* <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        
      </IconButtonAnimate> */}

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{translate('Notifications.Notifications')}</Typography>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalRecord} unread messages
            </Typography> */}
          </Box>
          {/* 
          {totalRecord! > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {loading ? (
          <Loader />
        ) : (
          <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 550 } }}>
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  {translate('Notifications.New')}
                </ListSubheader>
              }
            >
              {/* {notificationList.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))} */}
            </List>
          </Scrollbar>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={() => LoadMore()}>
            {translate('Notifications.ViewMore')}
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

type NotificationItemProps = {
  id: number;
  trackingId: number;
  notificationMessageId: number;
  applicationId?: number;
  title: string;
  controllerLink?: string;
  message: string;
  fromUserName: string | null;
  fromUserPhotoPath: string;
  isRead: boolean;
  createdOn: string;
  trackingNumber: string;
  remarks: string;
};

function NotificationItem({ notification }: { notification: NotificationItemProps }) {

  const { avatar, title } = renderContent(notification);
  const navigate = useNavigate();
  const setTrackingLocalStorage = (trackingID?: number) => {
    if (trackingID != undefined || trackingID != 0) {
      window.localStorage.setItem('hilightID', trackingID!.toString());
    } else window.localStorage.removeItem('hilightID');
  };
  const readNotifications = (
    id: number,
    system?: number,
    action?: string,
    trackingId?: number,
    notificationType?: number
  ) => {
    if (system === 2 && action == 'InternalDocumentController') {
      setTrackingLocalStorage(trackingId);
    }
  };
  return (
    <>
      <span
        onClick={() => {
          readNotifications(
            notification.id,
            notification.applicationId,
            notification.controllerLink,
            notification.trackingId,
            notification.notificationMessageId
          );
        }}
      >
        <ListItemButton
          sx={{
            borderBottom: 1,
            py: 1.5,
            px: 2.5,
            mt: '1px',
            ...(notification.isRead === false && {
              bgcolor: 'action.selected',
            }),
          }}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={title}
            secondary={
              <>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.disabled',
                  }}
                >
                  <Iconify icon="uil:user" sx={{ mr: 0.5, width: 16, height: 16 }} />
                  {noCase('From' + notification.fromUserName)}
                  <Iconify
                    icon="eva:clock-outline"
                    sx={{ ml: 0.5, mr: 0.5, width: 16, height: 16 }}
                  />
                  {fToNow(notification.createdOn)}
                </Typography>
              </>
            }
          />
        </ListItemButton>
      </span>
    </>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: NotificationItemProps) {
  const title = (
    <>
      <Typography fontSize={10} sx={{ fontWeight: 'bold' }}>
        {notification.title + ' ' + notification.trackingNumber}{' '}
      </Typography>
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.remarks}
      </Typography>
    </>
  );

  // if (notification.title === 'Reception') {
  return {
    avatar: notification.fromUserName ? (
      <Avatar alt={notification.fromUserName} src={baseUrl + notification.fromUserPhotoPath} />
    ) : null,
    title,
  };
  // }
  // return {
  //   avatar: notification.fromUserName ? (
  //     <img
  //       alt={notification.title}
  //       src={baseUrl + notification.fromUserPhotoPath}
  //     />
  //   ) : null,
  //   title,
  // };
}
