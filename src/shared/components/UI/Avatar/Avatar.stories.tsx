import type { Story } from '@ladle/react';

import type { AvatarProps } from './Avatar';
import { Avatar } from './Avatar';

const AvatarStory: Story<AvatarProps> = ({ children, ...props }) => {
  return <Avatar {...props}>{children}</Avatar>;
};

export const Icon = AvatarStory.bind({});
Icon.args = {
  variant: 'light',
  size: 'lg',
};

export const Text = AvatarStory.bind({});
Text.args = {
  variant: 'light',
  size: 'lg',
  children: 'XM',
};

export const Image = AvatarStory.bind({});
Image.args = {
  variant: 'light',
  size: 'lg',
  src: 'https://i.pravatar.cc/300',
};

export default {
  argTypes: {
    variant: {
      options: ['filled', 'light', 'outline'],
      control: {
        type: 'select',
      },
      defaultValue: 'light',
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: {
        type: 'select',
      },
      defaultValue: 'lg',
    },
    radius: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: {
        type: 'select',
      },
      defaultValue: 'xl',
    },
    color: {
      options: ['primary', 'red', 'yellow', 'green', 'blue', 'gray'],
      control: {
        type: 'select',
      },
      defaultValue: 'primary',
    },
    isDeleted: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
};
