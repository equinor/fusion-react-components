import * as faker from 'faker';

export type DataType = { firstName: string; lastName: string };

export const generateData = (n: number, y = 5): DataType[] => {
  const generated = {
    firsname: [...new Array(y)].map(() => faker.name.firstName()),
    lastName: [...new Array(y)].map(() => faker.name.lastName()),
    company: [...new Array(y)].map(() => faker.company.companyName()),
  };
  const random = (k: keyof typeof generated) => generated[k][Math.floor(Math.random() * y)];
  return [...new Array(n)].map(() => ({
    firstName: random('firsname'),
    lastName: random('lastName'),
    company: random('company'),
  }));
};

export default generateData;
