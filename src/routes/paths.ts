// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOT_PMISDASHBOARD = '/pmisdashboard';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  // Users Path
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/UserCreate/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    Loglist: path(ROOTS_DASHBOARD, '/user/Loglist'),
    //detail: path(ROOTS_DASHBOARD, '/user/detail'),
    detail: (id: any) => path(ROOTS_DASHBOARD, `/user/detail/${id}`),
    //profile: path(ROOTS_DASHBOARD, '/user/Profile'),
    profile: (id: any) => path(ROOTS_DASHBOARD, `/user/profile/${id}`),
    changePassword: path(ROOTS_DASHBOARD, '/user/ChangePassword/changePassword'),
    resetPassword: path(ROOTS_DASHBOARD, '/user/ResetPassword/resetPassword'),
    edit: path(ROOTS_DASHBOARD, `/user/edit`),
    UserReportIndex: path(ROOTS_DASHBOARD, '/user/UserReportIndex'),
  },
  // ITSMS

  // Employee
  Employee: {
    root: path(ROOTS_DASHBOARD, '/Employee'),
    list: path(ROOTS_DASHBOARD, '/Employee/list'),
    new: path(ROOTS_DASHBOARD, '/Employee/new'),
    edit: path(ROOTS_DASHBOARD, '/Employee/edit'),
    detail: path(ROOTS_DASHBOARD, '/Employee/detail'),
    print: path(ROOTS_DASHBOARD, '/Employee/print'),
    accountReport: path(ROOTS_DASHBOARD, '/Employee/accountReport'),
  },

  // Position title
  EmployeePosition: {
    root: path(ROOTS_DASHBOARD, '/EmployeePosition'),
    list: path(ROOTS_DASHBOARD, '/EmployeePosition/list'),
    new: path(ROOTS_DASHBOARD, '/EmployeePosition/new'),
    edit: path(ROOTS_DASHBOARD, '/EmployeePosition/edit'),
    detail: path(ROOTS_DASHBOARD, '/EmployeePosition/detail'),
  },

  // Employee Position
  ContractDetails: {
    root: path(ROOTS_DASHBOARD, '/ContractDetails'),
    list: path(ROOTS_DASHBOARD, '/ContractDetails/list'),
    new: path(ROOTS_DASHBOARD, '/ContractDetails/new'),
    edit: path(ROOTS_DASHBOARD, '/ContractDetails/edit'),
    detail: path(ROOTS_DASHBOARD, '/ContractDetails/detail'),
  },

  // PositionTitle
  PositionTitle: {
    root: path(ROOTS_DASHBOARD, '/PositionTitle'),
    list: path(ROOTS_DASHBOARD, '/PositionTitle/list'),
    new: path(ROOTS_DASHBOARD, '/PositionTitle/new'),
    edit: path(ROOTS_DASHBOARD, '/PositionTitle/edit'),
    detail: path(ROOTS_DASHBOARD, '/PositionTitle/detail'),
  },
  // PositionTitle
  Goods: {
    root: path(ROOTS_DASHBOARD, '/Goods'),
    list: path(ROOTS_DASHBOARD, '/Goods/list'),
    new: path(ROOTS_DASHBOARD, '/Goods/new'),
    edit: path(ROOTS_DASHBOARD, '/Goods/edit'),
    detail: path(ROOTS_DASHBOARD, '/Goods/detail'),
  },

  // JobPosition
  JobPosition: {
    root: path(ROOTS_DASHBOARD, '/JobPosition'),
    list: path(ROOTS_DASHBOARD, '/JobPosition/list'),
    new: path(ROOTS_DASHBOARD, '/JobPosition/new'),
    edit: path(ROOTS_DASHBOARD, '/JobPosition/edit'),
    detail: path(ROOTS_DASHBOARD, '/JobPosition/detail'),
  },

  // Customer
  Customer: {
    root: path(ROOTS_DASHBOARD, '/Customer'),
    list: path(ROOTS_DASHBOARD, '/Customer/list'),
    new: path(ROOTS_DASHBOARD, '/Customer/new'),
    edit: path(ROOTS_DASHBOARD, '/Customer/edit'),
    detail: path(ROOTS_DASHBOARD, '/Customer/detail'),
  },
  // Supplier
  Supplier: {
    root: path(ROOTS_DASHBOARD, '/Supplier'),
    list: path(ROOTS_DASHBOARD, '/Supplier/list'),
    new: path(ROOTS_DASHBOARD, '/Supplier/new'),
    edit: path(ROOTS_DASHBOARD, '/Supplier/edit'),
    detail: path(ROOTS_DASHBOARD, '/Supplier/detail'),
  },
  // ExpenseType
  ExpenseType: {
    root: path(ROOTS_DASHBOARD, '/ExpenseType'),
    list: path(ROOTS_DASHBOARD, '/ExpenseType/list'),
    new: path(ROOTS_DASHBOARD, '/ExpenseType/new'),
    edit: path(ROOTS_DASHBOARD, '/ExpenseType/edit'),
    detail: path(ROOTS_DASHBOARD, '/ExpenseType/detail'),
  },
  // Expense
  Expense: {
    root: path(ROOTS_DASHBOARD, '/Expense'),
    list: path(ROOTS_DASHBOARD, '/Expense/list'),
    new: path(ROOTS_DASHBOARD, '/Expense/new'),
    edit: path(ROOTS_DASHBOARD, '/Expense/edit'),
    detail: path(ROOTS_DASHBOARD, '/Expense/detail'),
  },

  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },

  // Role
  Role: {
    root: path(ROOTS_DASHBOARD, '/role'),
    list: path(ROOTS_DASHBOARD, '/role/list'),
    new: path(ROOTS_DASHBOARD, '/role/RoleCreate/new'),
    edit: path(ROOTS_DASHBOARD, '/role/role/edit'),
    detail: path(ROOTS_DASHBOARD, '/role/role/detail'),
    demoEdit: path(ROOTS_DASHBOARD, '/role/product/nike-blazer-low-77-vintage/edit'),
  },

  // Permission
  Permission: {
    root: path(ROOTS_DASHBOARD, '/Permission'),
    list: path(ROOTS_DASHBOARD, '/Permission/list'),
    new: path(ROOTS_DASHBOARD, '/Permission/PermissionFrom/new'),
    edit: path(ROOTS_DASHBOARD, '/Permission/Permission/edit'),
    detail: path(ROOTS_DASHBOARD, '/Permission/Permission/detail'),
    demoEdit: path(ROOTS_DASHBOARD, '/Language/product/nike-blazer-low-77-vintage/edit'),
  },

  // Language
  Language: {
    root: path(ROOTS_DASHBOARD, '/Language'),
    list: path(ROOTS_DASHBOARD, '/Language/list'),
    new: path(ROOTS_DASHBOARD, '/Language/LanguageCreate/new'),
    edit: path(ROOTS_DASHBOARD, '/Language/Language/edit'),
    demoEdit: path(ROOTS_DASHBOARD, '/Language/product/nike-blazer-low-77-vintage/edit'),
  },

  // Year
  Year: {
    root: path(ROOTS_DASHBOARD, '/Year'),
    list: path(ROOTS_DASHBOARD, '/Year/list'),
    new: path(ROOTS_DASHBOARD, '/Year/new'),
    edit: path(ROOTS_DASHBOARD, '/Year/edit'),
  },

  // ========================= Employee Attendance ============================
  EmployeeAttendance: {
    root: path(ROOTS_DASHBOARD, '/employeeAttendance'),
    list: path(ROOTS_DASHBOARD, '/employeeAttendance/list'),
  },

  // Province
  Province: {
    root: path(ROOTS_DASHBOARD, '/Province'),
    list: path(ROOTS_DASHBOARD, '/Province/list'),
    new: path(ROOTS_DASHBOARD, '/Province/new'),
    edit: path(ROOTS_DASHBOARD, '/Province/edit'),
    detail: path(ROOTS_DASHBOARD, '/Province/detail'),
  },
  // District
  district: {
    root: path(ROOTS_DASHBOARD, '/District'),
    list: path(ROOTS_DASHBOARD, '/District/list'),
    new: path(ROOTS_DASHBOARD, '/District/District/new'),
    edit: path(ROOTS_DASHBOARD, '/District/District/edit'),
    detail: path(ROOTS_DASHBOARD, '/District/District/detail'),
  },

  // ContractType
  ContractType: {
    root: path(ROOTS_DASHBOARD, '/ContractType'),
    list: path(ROOTS_DASHBOARD, '/ContractType/list'),
    new: path(ROOTS_DASHBOARD, '/ContractType/new'),
    edit: path(ROOTS_DASHBOARD, '/ContractType/edit'),
    //detail: path(ROOTS_DASHBOARD, '/ContractType/detail'),
  },

  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};
