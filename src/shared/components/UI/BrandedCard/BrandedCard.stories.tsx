import { Box } from '@mantine/core';

import type { Story } from '@ladle/react';
import { IconInfoSquareRounded } from '@tabler/icons-react';

import type { BrandedCardProps } from './BrandedCard';
import { BrandedCard } from './BrandedCard';

type StoryProps = BrandedCardProps & { withIcon?: boolean };
const BrandedCardStories: Story<StoryProps> = props => {
  let icon;

  if (props.withIcon) {
    icon = <IconInfoSquareRounded />;
  }
  return (
    <BrandedCard {...{ ...props, icon }}>
      <Box>content</Box>
    </BrandedCard>
  );
};

export const Default = BrandedCardStories.bind({});
Default.args = {
  title: 'Title',
};

export default {
  argTypes: {
    color: {
      options: ['gray', 'dark', 'red', 'primary', 'orange'],
      control: {
        type: 'select',
      },
      defaultValue: 'gray',
    },
    withIcon: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    variant: {
      options: ['default', 'filled', 'outlined'],
      control: {
        type: 'select',
      },
      defaultValue: 'default',
    },
  },
};
