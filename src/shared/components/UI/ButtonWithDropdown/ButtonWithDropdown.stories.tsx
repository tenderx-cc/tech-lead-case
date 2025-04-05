import type { Story } from '@ladle/react';

import type { ButtonWithDropdownProps } from './ButtonWithDropdown';
import { ButtonWithDropdown } from './ButtonWithDropdown';

const ButtonWithDropdownStory: Story<ButtonWithDropdownProps> = ({
  ...props
}) => {
  return <ButtonWithDropdown {...props} />;
};

export const Default = ButtonWithDropdownStory.bind({});
Default.args = {
  items: [
    { label: 'Item 1', onClick: () => console.log('Item 1 clicked') },
    { label: 'Item 2', onClick: () => console.log('Item 2 clicked') },
    { label: 'Item 3', onClick: () => console.log('Item 3 clicked') },
  ],
  label: 'Dropdown',
  drowdownLabel: 'Choose an option',
  dropdownPosition: 'bottom-start',
};
