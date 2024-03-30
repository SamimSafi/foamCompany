export interface YearInterface {
  id?: number | undefined;
  yearShamsi?: string;
  setDefault?: boolean | null;
  afterSubmit?: string;
}

export interface YearParams {
  pageIndex: number;
  pageSize: number;
  id?: number;
  yearShamsi?: string;
  setDefault?: boolean;
}
