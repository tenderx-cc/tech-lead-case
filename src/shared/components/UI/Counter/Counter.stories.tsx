import type { Story } from '@ladle/react';

import type { CounterProps } from './Counter';
import { Counter } from './Counter';

const CounterStory: Story<CounterProps> = ({
  color,
  variant,
  value,
  ...props
}) => {
  return <Counter variant={variant} value={value} color={color} {...props} />;
};

export const Single = CounterStory.bind({});
Single.args = {
  variant: 'filled',
  value: 1,
};

export const Multi = CounterStory.bind({});
Multi.args = {
  variant: 'filled',
  value: 272,
};

export default {
  argTypes: {
    variant: {
      options: ['filled', 'subtle'],
      control: {
        type: 'select',
      },
      defaultValue: 'filled',
    },
    color: {
      options: ['primary', 'gray'],
      control: {
        type: 'select',
      },
      defaultValue: 'primary',
    },
    size: {
      options: ['xs', 'sm'],
      control: {
        type: 'select',
      },
      defaultValue: 'sm',
    },
  },
};
