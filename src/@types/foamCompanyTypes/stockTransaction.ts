export interface IStockTransaction {
  id?: number;
  goodsId?: number;
  transactionType?: string; // "IN" | "OUT";
  amount?: number;
  branchId?: number;
  date?: Date;
  approvedBy?: string;
  description?: string;
  afterSubmit?: string;
}


export interface IStockTransactionParams {
  pageIndex: number;
  pageSize: number;
  searchBy?: string;
}
