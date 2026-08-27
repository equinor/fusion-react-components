import type { PersonCellData, PersonItemSize } from '@equinor/fusion-react-person';

export type CustomRenderParams<TCellValue> = {
  azureId?: (data: TCellValue) => string | string[] | undefined;
  upn?: (data: TCellValue) => string | string[] | undefined;
  dataSource?: (data: TCellValue) => PersonCellData | PersonCellData[];
  heading?: <P extends PersonCellData>(person: P) => string | undefined;
  subHeading?: <P extends PersonCellData>(person: P) => string | undefined;
  showAvatar?: boolean;
  size?: PersonItemSize;
};

export type PersonColDef<TCellValue> = CustomRenderParams<TCellValue> & {
  dataToSort?: (data: TCellValue) => string | undefined;
};
