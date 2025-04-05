import { useState } from 'react';

import { Stack, Text } from '@mantine/core';

import type { Story } from '@ladle/react';
import { IconStatusChange } from '@tabler/icons-react';

import type { MultiCheckboxOption, MultiCheckboxProps } from './MultiCheckbox';
import { MultiCheckbox } from './MultiCheckbox';

const SelectStory: Story<MultiCheckboxProps> = props => {
  const [values, setValues] = useState<MultiCheckboxOption[]>([]);

  const onChange = (value: MultiCheckboxOption[]) => {
    setValues(value);
  };

  const removeValue = (value: MultiCheckboxOption) => {
    setValues(values.filter(v => v.value !== value.value));
  };

  return (
    <Stack>
      {values.map(value => (
        <Text key={value.value} onClick={() => removeValue(value)}>
          {value.label}
        </Text>
      ))}
      <MultiCheckbox values={values} onChange={onChange} {...props} />
    </Stack>
  );
};

export const Filled = SelectStory.bind({});
Filled.args = {
  label: 'status',
  icon: <IconStatusChange />,
  options: [
    { value: '1', label: 'option 1' },
    { value: '2', label: 'option 2' },
    { value: '3', label: 'option 3' },
  ],
};
