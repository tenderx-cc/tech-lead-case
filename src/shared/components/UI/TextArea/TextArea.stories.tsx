import type { Story } from '@ladle/react';
import { IconSearch } from '@tabler/icons-react';

import type { TextAreaProps } from './TextArea';
import { TextArea } from './TextArea';

const TextInputStory: Story<TextAreaProps> = ({ icon, ...props }) => {
  return (
    <TextArea
      placeholder="placeholder..."
      icon={icon ? <IconSearch /> : undefined}
      {...props}
    />
  );
};

export const Filled = TextInputStory.bind({});
Filled.args = {
  variant: 'filled',
  size: 'xs',
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
    icon: {
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
