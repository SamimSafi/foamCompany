// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// ----------------------------------------------------------------------
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------
const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const permissions = (permissionName?: any) => {
  const getUserDataFromLocalStorage: any = localStorage.getItem('userData');
  const changeLocalStorgeStringToValue = JSON.parse(getUserDataFromLocalStorage);
  const is_super_admin = changeLocalStorgeStringToValue?.IsSuperAdmin;
  const permission = changeLocalStorgeStringToValue?.userpermission.map((data: any) => data.Name);
  if (!is_super_admin && !permission?.includes(permissionName)) {
    return false;
  } else {
    return true;
  }
};

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  lookUp: getIcon('ic_lookup'),
  dmts: getIcon('ic_dmts'),
  ums: getIcon('ic_ums'),
  itsms: getIcon('ic_itsms'),
  hr: getIcon('ic_hr'),
  archive: getIcon('ic_archive'),
  reception: getIcon('ic_reception'),
  news: getIcon('ic_news'),
  administrative: getIcon('ic_administrative'),
  bookdiary: getIcon('ic_bookdiary'),
};

const navConfig = [
  // GENERAL

  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'application', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    // Lookup Table
    items: [
      {
        title: 'lookuptable',
        path: '#1',
        icon: ICONS.lookUp,
        roles: [
          'Language-GetList',
          'Year-GetList',
          'ContractType-GetAll',
          'PositionTitle-GetAll',
          'JobPosition-GetAll',
        ],
        children: [
          {
            title: 'CommonLookUps',
            path: '#5',
            roles: [
              'Province-GetList',
              'District-GetList',
              'Language-GetList',
            ],
            children: [
              {
                title: 'province',
                path: PATH_DASHBOARD.Province.list,
                roles: ['Province-GetList'],
              },
              {
                title: 'district',
                path: PATH_DASHBOARD.district.list,
                roles: ['District-GetList'],
              },

              { title: 'year', path: PATH_DASHBOARD.Year.list, roles: ['Year-GetList'] },
              {
                title: 'language',
                path: PATH_DASHBOARD.Language.list,
                roles: ['Language-GetList'],
              },
            ],
          },
          //HR lookups Table
          {
            title: 'HRLookupTables',
            path: '#5',
            roles: [
              'ContractType-GetAll',
              'PositionTitle-GetAll',
              'JobPosition-GetAll',
            ],
            children: [
              {
                title: 'contractType',
                path: PATH_DASHBOARD.ContractType.list,
                roles: ['ContractType-GetAll'],
              },

              {
                title: 'positionTitle',
                path: PATH_DASHBOARD.PositionTitle.list,
                roles: ['PositionTitle-GetAll'],
              },

              {
                title: 'jobPosition',
                path: PATH_DASHBOARD.JobPosition.list,
                roles: ['JobPosition-GetAll'],
              },
            ],
          },
        ],
      },

      // UMS
      {
        title: 'UMS',
        path: '#1',
        icon: ICONS.ums,
        roles: [
          'User-Create',
          'User-GetAll',
          'Profile-ChangePassword',
          'Permission-GetAll',
          'Role-GetAll',
          'Role-Create',
          'Application-GetList',
        ],
        children: [
          {
            title: 'UserManagement',
            path: '#2',
            roles: ['User-Create', 'User-GetAll', 'User-UserLog', 'Profile-ChangePassword'],
            children: [
              { title: 'createUser', path: PATH_DASHBOARD.user.new, roles: ['User-Create'] },
              { title: 'Userlist', path: PATH_DASHBOARD.user.list, roles: ['User-GetAll'] },
              { title: 'UserLogList', path: PATH_DASHBOARD.user.Loglist, roles: ['User-UserLog'] },
              {
                title: 'UserReport',
                path: PATH_DASHBOARD.user.UserReportIndex,
                roles: ['User-UserReport'],
              },
              {
                title: 'changePassword',
                path: PATH_DASHBOARD.user.changePassword,
              },
            ],
          },
          {
            title: 'Permission',
            path: '#3',
            roles: ['Permission-GetAll'],
            children: [
              { title: 'list', path: PATH_DASHBOARD.Permission.list, roles: ['Permission-GetAll'] },
              // { title: 'create', path: PATH_DASHBOARD.Permission.new },
            ],
          },
          {
            title: 'Role',
            path: '#4',
            roles: ['Role-GetAll', 'Role-Create'],
            children: [
              { title: 'list', path: PATH_DASHBOARD.Role.list, roles: ['Role-GetAll'] },
              { title: 'create', path: PATH_DASHBOARD.Role.new, roles: ['Role-Create'] },
            ],
          },
        ],
      },
      // Human resource
      {
        title: 'hr',
        path: '#1',
        icon: ICONS.hr,
        roles: ['Employee-GetAll', 'CardDetails-GetPrintableCardList'],
        children: [
          {
            title: 'emp',
            path: PATH_DASHBOARD.Employee.list,
            roles: ['Employee-GetAll'],
          },
          {
            title: 'cardPrint',
            path: PATH_DASHBOARD.Employee.print,

            roles: ['CardDetails-GetPrintableCardList'],
            state: { EmployeeIdForPrint: undefined, from: undefined },
          },
          {
            title: 'EmployeeReport',
            path: PATH_DASHBOARD.Employee.accountReport,

            // roles: ['CardDetails-GetPrintableCardList'],
            // state: { EmployeeIdForPrint: undefined, from: undefined },
          },
        ],
      },

      // Employee Attendance
      {
        title: 'attendance',
        path: '#1',
        icon: ICONS.calendar,
        children: [
          {
            title: 'attendance',
            path: PATH_DASHBOARD.EmployeeAttendance.list,
          },
        ],
      },
    
    ],
  },
];

export default navConfig;
