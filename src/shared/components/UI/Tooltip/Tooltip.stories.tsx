import { Box } from '@mantine/core';

import type { Story } from '@ladle/react';

import type { TooltipProps } from './Tooltip';
import { Tooltip } from './Tooltip';

const TooltipStory: Story<TooltipProps> = ({ ...props }) => {
  return (
    <Tooltip {...props}>
      <Box w="fit-content" sx={{ border: `1px solid red` }}>
        Hover me
      </Box>
    </Tooltip>
  );
};

export const Default = TooltipStory.bind({});
Default.args = {
  content: 'Tooltip content',
};
