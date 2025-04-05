import type { Story } from '@ladle/react';

import type { DateInputProps } from './DateInput';
import { DateInput } from './DateInput';

const DateInputStory: Story<DateInputProps> = ({ styles, ...props }) => {
  return <DateInput styles={styles} {...props} />;
};

export const Default = DateInputStory.bind({});
Default.args = {
  label: 'Select Date',
};

export default {
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Select Date',
    },
    defaultDate: {
      control: {
        type: 'date',
      },
    },
    disabled: {
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
    required: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    // Add other DatePickerInputProps controls as needed
  },
};
