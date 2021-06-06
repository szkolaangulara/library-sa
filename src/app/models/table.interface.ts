export interface TableData {
  data: RowSingleData[];
}

export interface RowSingleData {
  value: (string | number | string[] | number[] | any),
  display: boolean;
}
