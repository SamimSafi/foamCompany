// Spider Chart
export interface DashBoardByUserBeforeAndAfterDeadLine {
  totalCategoryCount: number;
  totalValueSum: number;
  data: dataCount[];
}

export interface dataCount {
  label: string;
  value: number;
}

// For Pie Chart
export interface DashBoardByRequestCategoriesBeforeAndAfterDeadLine {
  label: string;
  value: number;
}

export interface DashBoardByCurrantDayAndProcessStatus {
  day: string;
  count: number;
}
