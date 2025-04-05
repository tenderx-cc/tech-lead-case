import type { Story } from '@ladle/react';
import { IconPlus } from '@tabler/icons-react';

import type { BadgeProps } from './Badge';
import { Badge } from './Badge';

const BadgeStory: Story<BadgeProps> = ({ leftIcon }) => {
  return (
    <Badge
      leftIcon={leftIcon ? <IconPlus /> : undefined}
      content="test"
      color="teal"
    />
  );
};

export const Default = BadgeStory.bind({});
