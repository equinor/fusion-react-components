import * as faker from 'faker';

export type DataType = { firstName: string; lastName: string; company: string; jobType: string };

export const generateData = (n: number, y = 5): DataType[] => {
  const generated = {
    firstName: [...new Array(y)].map(() => faker.name.firstName()),
    lastName: [...new Array(y)].map(() => faker.name.lastName()),
    company: [...new Array(y)].map(() => faker.company.companyName()),
    jobType: [...new Array(y)].map(() => faker.name.jobType()),
  };
  const random = (k: keyof typeof generated) => generated[k][Math.floor(Math.random() * y)];
  return [...new Array(n)].map(() => ({
    firstName: random('firstName'),
    lastName: random('lastName'),
    company: random('company'),
    jobType: random('jobType'),
  }));
};

export default generateData;
