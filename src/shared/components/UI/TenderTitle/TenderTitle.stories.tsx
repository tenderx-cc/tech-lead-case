import type { Story } from '@ladle/react';

import { TenderTitle, type TenderTitleProps } from './TenderTitle';

const TenderTitleStory: Story<TenderTitleProps> = ({ ...props }) => {
  return <TenderTitle {...props} />;
};

export const Default = TenderTitleStory.bind({});
Default.args = {
  buyerOriginalName: 'Région Bretagne',
  tenderTitle:
    'Prestations de maitrise d??uvre de la Région Bretagne\npour la mise en place de nouveaux sites internet, la maintenance des sites, l?homologation et recette',
  logoURL: 'https://logo.clearbit.com/bretagne.bzh',
  buyerId: 36146,
};

export default {
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
      defaultValue: 'md',
    },
  },
};
