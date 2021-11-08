export type Sheet = {
  columns: {
    name: string;
    type: AllowedExcelTypes;
  }[];
  rows: unknown[][];
};

export type ExcelExportProps = {
  client: (data: { sheets: Sheet[] }) => Promise<void>;
  disabled?: boolean;
};

export type AllowedExcelTypes = 'string' | 'integer' | 'datetime' | 'boolean' | 'url';
