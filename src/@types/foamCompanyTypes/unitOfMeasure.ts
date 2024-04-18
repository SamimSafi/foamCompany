export interface IUnitOfMeasure {
  id?: number;
  name?: string;
  englishName?: string;
  dariName?: string;
  pashtoName?: string;
  afterSubmit?: string;
}

export interface IUnitOfMeasureParams {
  pageIndex?: number;
  pageSize?: number;
  name?: string;
}
