import {
  PersonAccountType,
  PersonDetails,
  PersonResolver,
  PersonInfo,
  PersonSearchResult,
} from '@equinor/fusion-react-person';

const fakeResponseTime = (delay = 0) => new Promise((res) => setTimeout(res, delay));

const users = [
  {
    azureId: '1234',
    upn: 'example@email.com',
    name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
    pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
    accountType: PersonAccountType.Consultant,
    jobTitle: 'X-Bouvet ASA (PX)',
    department: 'FOIT CON PDP',
    mail: 'example@email.com',
    officeLocation: 'Stavanger',
    mobilePhone: '+47 555 55 555',
    manager: {
      azureUniqueId: '111-222-333',
      name: 'Lagertha Kristensen',
      department: 'Leader Techn Mgmt',
      pictureSrc: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
      accountType: PersonAccountType.Employee,
    },
    positions: [
      {
        id: '123-123',
        name: 'Developer Frontend',
        project: {
          id: '1234-1234',
          name: 'Fusion',
        },
      },
      {
        id: '234-234',
        name: 'Developer Frontend',
        project: {
          id: '2345-2345',
          name: 'Fusion org v2',
        },
      },
    ],
  },
  {
    azureId: '49132c24-6ea4-41fe-8221-112f314573f0',
    name: 'Albert Einstein (Bouvet ASA)',
    pictureSrc: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025',
    accountType: PersonAccountType.Employee,
    jobTitle: 'X-Bouvet ASA (PX)',
    department: 'FOIT CON PDP',
    mail: 'abby@sience.com',
    officeLocation: 'Stavanger',
    mobilePhone: '+47 555 55 555',
    managerAzureUniqueId: '111-222-333',
    manager: {
      azureUniqueId: '111-222-333',
      name: 'Lagertha Lothbrok',
      department: 'Leader Techn Mgmt',
      pictureSrc: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
      accountType: PersonAccountType.Employee,
    },
    positions: [
      {
        id: '123-123',
        name: 'Developer Frontend',
        project: {
          id: '1234-1234',
          name: 'Fusion',
        },
      },
      {
        id: '234-234',
        name: 'Developer Frontend',
        project: {
          id: '2345-2345',
          name: 'Fusion org v2',
        },
      },
    ],
  },
  {
    azureId: '49132c24-6ea4-41fe-8221-112f314573fe',
    name: 'Tux Pingvin (Bouvet ASA)',
    pictureSrc: 'https://149366088.v2.pressablecdn.com/wp-content/uploads/2016/10/other-linux-logo.png',
    accountType: PersonAccountType.Employee,
    jobTitle: 'X-Bouvet ASA (PX)',
    department: 'FOIT CON PDP',
    mail: 'tux@linux.dev',
    officeLocation: 'Cloud',
    mobilePhone: '+47 555 55 555',
    managerAzureUniqueId: '111-222-333',
    manager: {
      azureUniqueId: '111-222-333',
      name: 'Lagertha Lothbrok',
      department: 'Leader Techn Mgmt',
      pictureSrc: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
      accountType: PersonAccountType.Employee,
    },
    positions: [
      {
        id: '123-123',
        name: 'Developer Frontend',
        project: {
          id: '1234-1234',
          name: 'Fusion',
        },
      },
      {
        id: '234-234',
        name: 'Developer Frontend',
        project: {
          id: '2345-2345',
          name: 'Fusion org v2',
        },
      },
    ],
  },
  {
    azureId: '9876-5432-1098',
    name: 'Rick Sanchez (C-137)',
    pictureSrc: 'https://i.imgur.com/17Kw9my.jpg',
    accountType: PersonAccountType.Enterprise,
    mail: 'rick.sanchez@email.com',
    mobilePhone: '+47 123456789',
  },
  {
    azureId: '111-222-333',
    name: 'Lagertha Lothbrok',
    department: 'Leader Techn Mgmt',
    pictureSrc: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
    accountType: PersonAccountType.Employee,
    mail: 'lagertha@email.com',
    mobilePhone: '+47 123456789',
  },
  {
    azureId: '222-333-444',
    name: 'Justin Roiland',
    department: 'Adult Swim',
    pictureSrc: 'https://i.imgur.com/2TO7k63.jpeg',
    accountType: PersonAccountType.Employee,
    mail: 'justin.r@email.com',
    mobilePhone: '+47 123456789',
  },
];

const getUsers = (args: {
  azureId?: string;
  upn?: string;
  search?: string;
  random?: boolean;
}): PersonDetails | PersonInfo | PersonSearchResult | void => {
  if (args.azureId) {
    return users.find((u) => u.azureId === args.azureId) as PersonDetails;
  } else if (args.upn) {
    return users.find((u) => u.upn === args.upn) as PersonDetails;
  } else if (args.search !== undefined) {
    const { search } = args;
    return users.filter(
      (u) =>
        u.name.toLocaleLowerCase().indexOf(search) > -1 ||
        u.mail.toLocaleLowerCase().indexOf(search) > -1 ||
        u.azureId === search ||
        u.mobilePhone.toLocaleLowerCase().indexOf(search) > -1,
    ) as PersonSearchResult;
  } else if (args.random) {
    return users[Math.floor(Math.random() * users.length)];
  }
};

type PersonPicture = PersonDetails & { pictureSrc: string };

export const createResolve: PersonResolver = {
  getDetails: (args) => fakeResponseTime().then(() => getUsers(args) as PersonDetails),
  getInfo: (args) => fakeResponseTime().then(() => getUsers(args) as PersonInfo),
  getPhoto: (args) => Promise.resolve((getUsers(args) as PersonPicture).pictureSrc),
  search: (args) => getUsers(args) as PersonSearchResult,
};
