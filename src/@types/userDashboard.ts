export interface userSummaryByDepartment {
  totalCategoryCount: number;
  totalValueSum: number;
  data: dataCount[];
}

export interface DepartmentAndDocumentTypeBeforeDeadLine {
  structureName: string[];
  value: number;
  groupBy: string;
  data: data[];
}

export interface dataCount {
  label: string;
  value: number;
}

export interface data {
  name: string;
  data: number[];
}
