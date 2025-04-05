import type { Story } from '@ladle/react';
import { IconPlus } from '@tabler/icons-react';

import type { ButtonProps } from './Button';
import { Button } from './Button';

const ButtonStory: Story<ButtonProps> = ({ leftIcon, rightIcon, ...props }) => {
  return (
    <Button
      leftIcon={leftIcon ? <IconPlus /> : undefined}
      rightIcon={rightIcon ? <IconPlus /> : undefined}
      {...props}
    >
      Button
    </Button>
  );
};

export const Filled = ButtonStory.bind({});
Filled.args = {
  variant: 'filled',
};

export const Subtle = ButtonStory.bind({});
Subtle.args = {
  variant: 'subtle',
};

export default {
  argTypes: {
    variant: {
      options: ['filled', 'subtle', 'light', 'outline', 'white', 'default'],
      control: {
        type: 'select',
      },
      defaultValue: 'filled',
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: {
        type: 'select',
      },
      defaultValue: 'md',
    },
    leftIcon: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    rightIcon: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
};
