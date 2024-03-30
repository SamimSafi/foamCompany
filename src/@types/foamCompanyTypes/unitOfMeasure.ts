export interface IUnitOfMeasure {
  id?: number;
  name?: string;
  description?: string;
  afterSubmit?: string;
}

export interface IUnitOfMeasureParams {
  pageIndex?: number;
  pageSize?: number;
  name?: string;
}
