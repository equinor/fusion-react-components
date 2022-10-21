import { PersonCardElementProps } from '@equinor/fusion-wc-person/person-card';
import PersonProvider from './PersonProvider';
import Person from './Person';
import { PersonAvailability, PersonDetails, PersonPresence, PersonResolver } from '@equinor/fusion-wc-person';
import { PersonElementProps } from '@equinor/fusion-wc-person/person';
import usePersonProviderRef from './hooks/usePersonProviderRef';
import { PersonDetails as PersonCardPersonDetails } from '@equinor/fusion';
// import { usePersonPersence } from './hooks/usePersonPresence';
import { useEffect, useState } from 'react';
// import usePersonDetails from './hooks/usePersonDetails';

type PersonCardPerson = {
  person?: PersonCardPersonDetails;
};

export type PersonCardProps = PersonCardElementProps & PersonElementProps & PersonCardPerson;

const mapDetails: Record<string, { lastUpdated: number; data: Promise<PersonDetails> }> = {};
const mapPresence: Record<string, { lastUpdated: number; data: Promise<PersonPresence> }> = {};

export const PersonCard = ({ person, azureId, ...props }: PersonCardProps): JSX.Element => {
  const [currentPerson, setCurrentPerson] = useState<PersonCardPersonDetails | null>(null);

  // const { imageUrl } = usePersonImageUrl(personDetails.azureUniqueId);
  // console.log('imageUrl', imageUrl);

  console.log('props.azureId', azureId);
  // const { presence, isFetching, error } = usePersonPersence(azureId);
  // const { personDetails, detailsFetching, detailsError } = usePersonDetails(azureId, person);

  const [mockPersonResolver, setMockPersonResolver] = useState<PersonResolver | undefined>(undefined);

  // useEffect(() => {
  //   if (!detailsError && personDetails) {
  //     setCurrentPerson(personDetails);
  //   }
  // }, [detailsError, personDetails]);

  useEffect(() => {
    if (person) {
      setCurrentPerson(person);
    }
  }, [person]);

  useEffect(() => {
    if (currentPerson) {
      const personResolver = {
        getDetails: async () => {
          if (!mapDetails[currentPerson.azureUniqueId]) {
            mapDetails[currentPerson.azureUniqueId] = {
              lastUpdated: Date.now(),
              data: new Promise((res) => {
                res({
                  azureId: currentPerson.azureUniqueId,
                  name: currentPerson.name,
                  pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
                  accountType: currentPerson.accountType,
                  jobTitle: currentPerson.jobTitle,
                  department: currentPerson.department,
                  mail: currentPerson.mail,
                  officeLocation: currentPerson.officeLocation,
                  company: currentPerson.company.name,
                  mobilePhone: currentPerson.mobilePhone,
                });
              }),
            };
          }
          return mapDetails[currentPerson.azureUniqueId].data;
        },
        getPresence: async () => {
          if (!mapPresence[currentPerson.azureUniqueId]) {
            mapPresence[currentPerson.azureUniqueId] = {
              lastUpdated: Date.now(),
              data: new Promise((res) => {
                res({
                  azureId: '1ea5f203-c1ad-4893-bdea-4fadd95455e4',
                  availability: PersonAvailability.Available,
                });
              }),
            };
          }
          return mapPresence[currentPerson.azureUniqueId].data;
        },
      };
      setMockPersonResolver(personResolver);
    }
  }, [currentPerson]);

  const providerRef = usePersonProviderRef(mockPersonResolver);

  return (
    <PersonProvider ref={providerRef}>
      <Person {...props} />
    </PersonProvider>
  );
};

export default PersonCard;
