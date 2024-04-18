export interface IExpense {
  id?: number;
  expenseTypeId?: number;
  amount?: number;
  description?: string;
  expenseType?: string;
  afterSubmit?: string;
}

export interface IExpenseParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
