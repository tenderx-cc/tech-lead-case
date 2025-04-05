import type { Story } from '@ladle/react';

import { Spinner } from './Spinner';

const SpinnerStory: Story = () => {
  return <Spinner />;
};

export const Default = SpinnerStory.bind({});
