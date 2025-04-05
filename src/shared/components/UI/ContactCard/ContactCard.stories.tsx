import type { Story } from '@ladle/react';

import type { Location } from '../../../entities/Location';
import type { ContactCardProps } from './ContactCard';
import { ContactCard } from './ContactCard';

type StoryProps = Omit<ContactCardProps, 'location'> & Location;
const ContactCardStories: Story<StoryProps> = props => {
  const { address, city, postalCode, NUTS, ...rest } = props;
  const location = {
    address,
    city,
    postalCode,
    NUTS,
  };
  return <ContactCard {...{ ...rest, location }} />;
};

export const Default = ContactCardStories.bind({});
Default.args = {
  email: 'roussel@david.com ',
  title: 'maire',
  name: 'Roussel David',
  phone: '06 12 34 56 78',
  address: '1 place du Général Leclerc',
  city: 'Quimper CEDEX',
  postalCode: '75001',
  NUTS: 'FR101',
};
