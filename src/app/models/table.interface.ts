export interface TableData {
  data: RowSingleData[];
}

export interface RowSingleData {
  value: (string | number),
  display: boolean;
}
