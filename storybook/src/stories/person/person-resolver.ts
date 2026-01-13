import {
  type PersonResolver,
  PersonAccountType,
  type PersonDetails,
  type PersonSuggestResult,
} from '@equinor/fusion-react-person';
import { faker } from '@faker-js/faker';

faker.seed(123);

const uuid2number = (x: string) => {
  return Number(x.replace(/[-]|[a-z]/g, '').substring(0, 15));
};

export const generateIds = (min: number, max: number): string[] => {
  const count = faker.number.int({ min, max });
  return new Array(count).fill(undefined).map(() => faker.string.uuid());
};

const generateManager = (azureId?: string): PersonDetails['manager'] => {
  faker.seed(uuid2number(azureId ?? '0') + 1);
  return {
    azureUniqueId: faker.string.uuid(),
    name: faker.person.fullName(),
    department: faker.commerce.department(),
  };
};

const generatePositions = (azureId?: string): PersonDetails['positions'] => {
  return new Array(faker.number.int({ min: 1, max: 10 })).fill(undefined).map((_, i) => {
    faker.seed(Number(azureId) + 1 + i);
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
      project: {
        id: faker.string.uuid(),
        name: faker.company.name(),
      },
    };
  });
};

const avatarSvg = async (avatarColor: string, name: string, accountType: string) => {
  const hasImage = faker.datatype.boolean({ probability: 0.8 });

  if (!hasImage || accountType === 'SystemAccount') {
    const nameArray = name.split(' ').map(x => x.substring(0, 1).toUpperCase());
    const initial = `${nameArray.shift()}${nameArray.pop()}`;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="32" fill="${avatarColor}"/>
        <circle cx="32" cy="32" r="28" fill="#fff"/>
        <text x="33" y="35" font-family="Equinor, sans-serif" font-size="26" font-weight="400" fill="#000" text-anchor="middle" dominant-baseline="central">${initial}</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  const imageUrl = faker.image.personPortrait({ size: 64 });
  const image = await fetch(imageUrl);
  const imageBlob = await image.blob();

  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
          <defs>
            <pattern id="avatarPattern" patternUnits="userSpaceOnUse" width="64" height="64" >
              <image href="${reader.result}" width="64" height="64" preserveAspectRatio = "xMidYMid slice" />
            </pattern>
          </defs>
          <circle cx="32" cy="32" r="32" fill="${avatarColor}"/>
          <circle cx="32" cy="32" r="28" fill="url(#avatarPattern)" />
        </svg>
      `;
      const finalDataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
      resolve(finalDataUrl);
    };
  });
};

export const generatePerson = async (args: { azureId?: string; upn?: string; accountType?: string }): Promise<PersonDetails> => {
  args.azureId && faker.seed(uuid2number(args.azureId));
  const azureId = args.azureId ?? faker.string.uuid();
  const fakeEquinorMail = faker.internet.email({ provider: 'equinor.com' });
  const name = faker.person.fullName();
  const avatarColor = faker.helpers.arrayElement(['#bebebe', '#eb0037', '#ff92a8', '#000']);
  const avatarUrl = await avatarSvg(avatarColor, name, args.accountType ?? 'Person');
  return {
    azureId,
    upn: args.upn ?? fakeEquinorMail,
    name: faker.person.fullName(),
    accountType: faker.helpers.arrayElement([
      PersonAccountType.Consultant,
      PersonAccountType.Employee,
      PersonAccountType.Enterprise,
      PersonAccountType.External,
      PersonAccountType.ExternalHire,
    ]),
    accountClassification: faker.helpers.arrayElement(['Internal', 'External']),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department(),
    mail: fakeEquinorMail,
    mobilePhone: faker.phone.number(),
    officeLocation: faker.location.city(),
    isExpired: faker.datatype.boolean({ probability: 0.1 }),
    avatarColor,
    avatarUrl,
    get positions() {
      return generatePositions(azureId);
    },
    get manager() {
      return generateManager(azureId);
    },
  };
};

const generateSuggestedPerson = async (args: { azureId: string }): Promise<PersonSuggestResult> => {
  const accountType = faker.helpers.arrayElement([
    'Person',
    'SystemAccount',
  ]);
  const generatedPerson = await generatePerson({ azureId: args.azureId, accountType });

  let person: PersonSuggestResult['person'] | undefined;
  let application: PersonSuggestResult['application'] | undefined;
  if (accountType === 'Person') {
    person = {
      accountType: faker.helpers.arrayElement([
        'Employee',
        'Consultant',
        'Enterprise',
        'EnterpriseExternal',
        'External',
        'Local',
        'TemporaryEmployee',
      ]),
      jobTitle: generatedPerson.jobTitle,
      department: generatedPerson.department,
      upn: generatedPerson.upn,
      mobilePhone: generatedPerson.mobilePhone,
      managerAzureUniqueId: generatedPerson.manager?.azureUniqueId,
    }
  } else if (accountType === 'SystemAccount') {
    application = {
      applicationId: faker.string.uuid(),
      applicationName: faker.company.name(),
      servicePrincipalType: faker.helpers.arrayElement([
        'Application',
        'ManagedIdentity',
        'ServicePrincipal',
      ]),
    }
  }

  return {
    azureUniqueId: generatedPerson.azureId,
    name: generatedPerson.name,
    accountType,
    person,
    application,
    isExpired: accountType === 'Person' ? generatedPerson.isExpired ?? false : false,
    avatarColor: generatedPerson.avatarColor ?? '',
    avatarUrl: generatedPerson.avatarUrl ?? '',
  };
};

export const resolver: PersonResolver = {
  getDetails: generatePerson,
  getInfo: generatePerson,
  getPhoto: (args: { azureId?: string; upn?: string }) => {
    args.azureId && faker.seed(uuid2number(args.azureId));
    const src = faker.image.personPortrait({ size: 64 });
    const failed = args.azureId === faker.string.uuid();
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          if (failed) {
            reject(Error('person does not exists'));
          }
          return resolve(src);
        },
        faker.number.int({ min: 20, max: 100 }),
      );
    });
  },
  search: async (args) => {
    return Promise.all(new Array(faker.number.int({ min: 3, max: 10 })).fill(undefined).map(async (_, i) => {
      faker.seed(
        args.search
          .split('')
          .map((x) => x.charCodeAt(0))
          .reduce((acc, item) => acc + item, 0) + i,
      );
      return await generatePerson({ azureId: faker.string.uuid() });
    }));
  },
  suggest: async (args) => {
    const generatedCount = faker.number.int({ min: 3, max: 25 });
    const value = await Promise.all(new Array(generatedCount).fill(undefined).map(async (_, i) => {
      faker.seed(
        args.search
          .split('')
          .map((x) => x.charCodeAt(0))
          .reduce((acc, item) => (acc += item), 0) + i,
      );
      return await generateSuggestedPerson({ azureId: faker.string.uuid() });
    }));
    return {
      totalCount: generatedCount * 3,
      count: generatedCount,
      value,
    };
  },
  resolve: async (args) => {
    return Promise.all(args.resolveIds.map(async (azureId) => {
      return {
        success: true,
        statusCode: 200,
        errorMessage: null,
        indentifier: azureId,
        account: await generateSuggestedPerson({ azureId }),
      };
    }));
  },
};
