import { forwardRef } from 'react';

import { Group, Text } from '@mantine/core';

import { Avatar } from '../../UI/Avatar/Avatar';

export type UserWithAvatarProps = {
  avatarColor: string;
  firstName: string;
  lastName: string;
  isDisabled: boolean;
  fw?: number;
  w?: string;
};

export const UserWithAvatar: React.FC<UserWithAvatarProps> = forwardRef<
  HTMLDivElement,
  UserWithAvatarProps
>(
  (
    {
      avatarColor,
      firstName,
      lastName,
      isDisabled,
      fw = 400,
      w = '220px',
      ...rest
    }: UserWithAvatarProps,
    ref,
  ) => {
    return (
      <Group
        ref={ref}
        noWrap
        align="center"
        spacing="02"
        w={w}
        py="02"
        {...rest}
      >
        <Avatar color={avatarColor} isDisabled={isDisabled}>
          {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
        </Avatar>
        <Text
          variant="sm"
          fw={fw}
          truncate
          strikethrough={isDisabled}
          c={isDisabled ? 'gray.3' : undefined}
        >
          {firstName} {lastName}
        </Text>
      </Group>
    );
  },
);
