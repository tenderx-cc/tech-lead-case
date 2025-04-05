import { forwardRef } from 'react';

import type { MantineColor, MantineSize } from '@mantine/core';
import { Center, Badge as MantineBadge, Text } from '@mantine/core';

export type BadgeProps = {
  leftIcon?: React.ReactNode;
  content?: string;
  size?: MantineSize;
  color?: MantineColor | string;
  textTransform?: 'capitalize' | 'none';
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      leftIcon,
      content,
      size = 'md',
      color = 'gray',
      textTransform = 'capitalize',
      ...rest
    },
    ref,
  ) => {
    return (
      <MantineBadge
        ref={ref}
        size={size}
        w="fit-content"
        pr={content ? '02' : '00'}
        pl={getPaddingLeft({ leftIcon, content })}
        mr={0}
        radius="lg"
        sx={theme => ({
          background: theme.colors[color as MantineColor]?.[1] ?? color,
          border: `1px solid ${theme.colors[color as MantineColor]?.[2] ?? color}`,
        })}
        leftSection={leftIcon && <Center>{leftIcon}</Center>}
        {...rest}
        styles={{
          leftSection: {
            marginRight: '00',
          },
        }}
      >
        <Text
          variant="xs"
          fw="600"
          color="gray.9"
          sx={{ textTransform: textTransform }}
        >
          {content}
        </Text>
      </MantineBadge>
    );
  },
);

const getPaddingLeft = ({
  leftIcon,
  content,
}: {
  leftIcon?: React.ReactNode;
  content?: string;
}) => {
  if (leftIcon) {
    return content ? '01' : '00';
  }
  return '02';
};

Badge.displayName = 'Badge';
