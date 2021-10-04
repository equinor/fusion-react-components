import namor from 'namor';

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: 'James',
    lastName: 'Bond',
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
  };
};

export const makeData = (rows: number) => {
  const range = [...new Array(rows).keys()];
  return range.map(() => newPerson());
};

export default makeData;
