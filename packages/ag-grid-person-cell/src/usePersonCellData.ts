import type { PersonCellData } from '@equinor/fusion-react-person';

type PersonDataProps = {
  azureId?: string;
  upn?: string;
  dataSource?: PersonCellData;
};

type PersonCellDataResult = {
  isArray: boolean;
  items?: PersonDataProps[];
  single?: PersonDataProps;
};

export const usePersonCellData = (
  azureResult?: string | string[],
  upnResult?: string | string[],
  dataSourceResult?: PersonCellData | PersonCellData[],
): PersonCellDataResult => {
  if (Array.isArray(azureResult)) {
    return {
      isArray: true,
      items: azureResult.map((item) => ({
        azureId: item,
      })),
    };
  }

  if (Array.isArray(upnResult)) {
    return {
      isArray: true,
      items: upnResult.map((item) => ({
        upn: item,
      })),
    };
  }

  if (Array.isArray(dataSourceResult)) {
    return {
      isArray: true,
      items: dataSourceResult.map((item) => ({
        dataSource: item,
      })),
    };
  }

  return {
    isArray: false,
    single: {
      azureId: azureResult,
      upn: upnResult,
      dataSource: dataSourceResult,
    } as PersonDataProps,
  };
};
