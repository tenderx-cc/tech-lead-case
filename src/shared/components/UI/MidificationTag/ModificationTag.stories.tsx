import { Stack } from '@mantine/core';

import type { Story } from '@ladle/react';

import { ModificationTag } from './ModificationTag';

export const RenewalTabStory: Story = () => {
  return (
    <Stack>
      <ModificationTag content="Modification" />
      <ModificationTag />
    </Stack>
  );
};
