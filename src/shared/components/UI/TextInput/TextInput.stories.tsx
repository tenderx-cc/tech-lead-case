import type { Story } from '@ladle/react';
import { IconHash, IconSearch } from '@tabler/icons-react';

import type { TextInputProps } from './TextInput';
import { TextInput } from './TextInput';

const TextInputStory: Story<TextInputProps> = ({
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <TextInput
      placeholder="placeholder..."
      leftIcon={leftIcon ? <IconSearch /> : undefined}
      rightIcon={rightIcon ? <IconHash /> : undefined}
      {...props}
    />
  );
};

export const Filled = TextInputStory.bind({});
Filled.args = {
  variant: 'filled',
  size: 'xs',
  fw: 400,
};

export default {
  argTypes: {
    variant: {
      options: ['filled', 'default'],
      control: {
        type: 'select',
      },
      defaultValue: 'filled',
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
      defaultValue: 'md',
    },
    fw: {
      options: [300, 400, 500, 600, 700, 800],
      control: {
        type: 'select',
      },
      defaultValue: 400,
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
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    required: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    error: {
      control: {
        type: 'text',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    description: {
      control: {
        type: 'text',
      },
    },
  },
};
