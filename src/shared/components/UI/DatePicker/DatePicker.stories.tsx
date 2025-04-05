import { useState } from 'react';

import { Stack, Text } from '@mantine/core';

import type { Story } from '@ladle/react';
import { IconCalendarDue } from '@tabler/icons-react';

import type { DatePickerProps } from './DatePicker';
import { DatePicker } from './DatePicker';

const SelectStory: Story<DatePickerProps> = ({ ...props }) => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Stack>
      <Text onClick={() => setDate(undefined)}>
        {date?.toLocaleDateString()}
      </Text>
      <DatePicker value={date} onChange={setDate} {...props} />
    </Stack>
  );
};

export const Filled = SelectStory.bind({});
Filled.args = {
  label: 'status',
  icon: <IconCalendarDue />,
};
