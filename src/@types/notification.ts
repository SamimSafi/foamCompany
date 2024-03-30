export interface notification {
  id: number;
  trackingId: number;
  notificationMessageId: number;
  title: string;
  message: string;
  isRead: boolean;
  fromUserId: string;
  fromUserName: string;
  applicationId: number;
  applicationName: string;
  controllerLink: string;
  actionLink: string;
  fromUserPhotoPath: string;
  createdOn: string;
  trackingNumber:string;
  remarks:string;
}

export interface notificationparams {
  pageIndex: number;
  pageSize: number;
}
