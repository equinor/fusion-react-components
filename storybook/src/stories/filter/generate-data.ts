import { faker } from '@faker-js/faker';

export type DataType = { firstName: string; lastName: string; company: string; jobType: string };

export const generateData = (n: number, y = 5): DataType[] => {
  faker.seed(100);
  const generated = {
    firstName: [...new Array(y)].map(() => faker.name.firstName()),
    lastName: [...new Array(y)].map(() => faker.name.lastName()),
    company: [...new Array(y)].map(() => faker.company.name()),
    jobType: [...new Array(y)].map(() => faker.name.jobType()),
  };
  const random = (k: keyof typeof generated) => generated[k][faker.number.int({ min: 0, max: y - 1 })]; //[faker.number.int({ min: 1, max: 5 })];
  return [...new Array(n)].map(() => ({
    firstName: random('firstName'),
    lastName: random('lastName'),
    company: random('company'),
    jobType: random('jobType'),
  }));
};

export default generateData;
