import { AvatarData, CardData, ListItemData, PersonAccountType, PersonAvailability, PersonDetails, PersonPresence, PersonResolver } from "@equinor/fusion-react-person";

export const createResolve = (accountType?: string) => {
    return {
        getImageByAzureId: async (azureId: string) => {
          await new Promise((resovle) => setTimeout(resovle, 3000));
          return await Promise.resolve({
            azureId: azureId,
            name: 'Albert Einstein',
            pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
            accountType: accountType ?? PersonAccountType.Employee,
          }) as AvatarData;
        },
        getImageByUpn: async (_upn: string) => {
          await new Promise((resovle) => setTimeout(resovle, 3000));
          return await Promise.resolve({
            name: 'Albert Einstein',
            pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
            accountType: accountType ?? PersonAccountType.Employee,
          }) as AvatarData;
        },
        getPresence: async (azureId: string) => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return {
            azureId,
            availability: PersonAvailability.Available,
          } as PersonPresence;
        },
        getDetails: async (azureId: string) => {
          await new Promise((res) => setTimeout(res, 2000));
          return await Promise.resolve({
              azureId: azureId,
              name: 'Albert Einstein (Bouvet ASA)',
              pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
              accountType: accountType ?? PersonAccountType.Consultant,
              jobTitle: 'X-Bouvet ASA (PX)',
              department: 'FOIT CON PDP',
              mail: 'example@email.com',
              officeLocation: 'Stavanger',
              mobilePhone: '+47 999999999',
              manager: {
                  azureUniqueId: '1234-1324-1235',
                  name: 'Lagertha Kristensen',
                  department: 'Leader Techn Mgmt',
                  pictureSrc:
                  'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
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
                  }, {
                      id: '234-234',
                      name: 'Developer Frontend',
                      project: {
                          id: '2345-2345',
                          name: 'Fusion org v2',
                      },
                  },
              ],
          }) as PersonDetails;
        },
        getCardDetailsByAzureId: async (azureId: string) => {
          await new Promise((res) => setTimeout(res, 2000));
          return await Promise.resolve({
              azureId: azureId,
              name: 'Albert Einstein (Bouvet ASA)',
              pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
              accountType: accountType ?? PersonAccountType.Consultant,
              jobTitle: 'X-Bouvet ASA (PX)',
              department: 'FOIT CON PDP',
              mail: 'example@email.com',
              officeLocation: 'Stavanger',
              mobilePhone: '+47 999999999',
              manager: {
                  azureUniqueId: '1234-1324-1235',
                  name: 'Lagertha Kristensen',
                  department: 'Leader Techn Mgmt',
                  pictureSrc:
                  'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
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
                  }, {
                      id: '234-234',
                      name: 'Developer Frontend',
                      project: {
                          id: '2345-2345',
                          name: 'Fusion org v2',
                      },
                  },
              ],
          }) as CardData;
        },
        getCardDetailsByUpn: async (_upn: string) => {
          await new Promise((res) => setTimeout(res, 2000));
          return await Promise.resolve({
              name: 'Albert Einstein (Bouvet ASA)',
              pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
              accountType: accountType ?? PersonAccountType.Consultant,
              jobTitle: 'X-Bouvet ASA (PX)',
              department: 'FOIT CON PDP',
              mail: 'example@email.com',
              officeLocation: 'Stavanger',
              mobilePhone: '+47 999999999',
              manager: {
                  azureUniqueId: '1234-1324-1235',
                  name: 'Lagertha Kristensen',
                  department: 'Leader Techn Mgmt',
                  pictureSrc:
                  'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
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
                  }, {
                      id: '234-234',
                      name: 'Developer Frontend',
                      project: {
                          id: '2345-2345',
                          name: 'Fusion org v2',
                      },
                  },
              ],
          }) as CardData;
        },
        getListItemDetailsByAzureId: async (azureId: string) => {
            await new Promise((res) => setTimeout(res, 2000));
            return await Promise.resolve({
                azureId: azureId,
                name: 'Albert Einstein (Bouvet ASA)',
                pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
                accountType: accountType ?? PersonAccountType.Consultant,
                jobTitle: 'X-Bouvet ASA (PX)',
                department: 'FOIT CON PDP',
                mail: 'example@email.com',
            }) as ListItemData;
          },
          getListItemDetailsByUpn: async (_upn: string) => {
            await new Promise((res) => setTimeout(res, 2000));
            return await Promise.resolve({
                name: 'Albert Einstein (Bouvet ASA)',
                pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
                accountType: accountType ?? PersonAccountType.Consultant,
                jobTitle: 'X-Bouvet ASA (PX)',
                department: 'FOIT CON PDP',
                mail: 'example@email.com',
            }) as ListItemData;
          },
      } as PersonResolver
    };