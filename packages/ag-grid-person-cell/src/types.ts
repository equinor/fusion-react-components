import type { PersonCellData, PersonItemSize } from '@equinor/fusion-react-person';

export type CustomRenderParams<T> = {
  azureId?: (data: T) => string | string[] | undefined;
  upn?: (data: T) => string | string[] | undefined;
  dataSource?: (data: T) => PersonCellData | PersonCellData[];
  heading?: <P extends PersonCellData>(person: P) => string | undefined;
  subHeading?: <P extends PersonCellData>(person: P) => string | undefined;
  showAvatar?: boolean;
  size?: PersonItemSize;
};

export type PersonColDef<T> = CustomRenderParams<T> & {
  dataToSort?: (data: T) => string | undefined;
};
