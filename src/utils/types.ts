export interface ExcelRecord {
  mobile: string;
  address: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

export interface ContextData {
  data: ExcelRecord[],
  setExcelData: () => void;
}

export type ExcelData = Array<Array<string | number>>;