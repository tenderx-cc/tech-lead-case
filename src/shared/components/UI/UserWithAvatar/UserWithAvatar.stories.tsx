import type { Story } from '@ladle/react';

import type { UserWithAvatarProps } from './UserWithAvatar';
import { UserWithAvatar } from './UserWithAvatar';

const UserWithAvatarStory: Story<UserWithAvatarProps> = ({ ...props }) => {
  return <UserWithAvatar {...props} />;
};

export const Default = UserWithAvatarStory.bind({});
Default.args = {
  avatarColor: 'blue',
  firstName: 'John',
  lastName: 'Doe',
  isDisabled: false,
};
