import { forwardRef } from 'react';

import { Group, Text, ThemeIcon } from '@mantine/core';

import { IconAlertCircle } from '@tabler/icons-react';

import { Badge } from '../Badge/Badge';

type ModificationTagProps = {
  content?: string;
};

export const ModificationTag = forwardRef<HTMLDivElement, ModificationTagProps>(
  ({ content, ...rest }, ref) => {
    return (
      <Badge
        ref={ref}
        leftIcon={
          <ThemeIcon size={20} c="orange" color="transparent" px={0}>
            <IconAlertCircle size={16} />
          </ThemeIcon>
        }
        content={content}
        color="orange"
        {...rest}
      />
    );
    return (
      <Group
        ref={ref}
        noWrap
        w="fit-content"
        h="20px"
        spacing="01"
        px={content ? '02' : '00'}
        bg="orange.1"
        c="orange.7"
        sx={theme => ({
          borderRadius: theme.radius.lg,
          border: content && `1px solid ${theme.colors.orange[2]}`,
          boxShadow: content && theme.shadows.sm,
        })}
        {...rest}
      >
        <IconAlertCircle size={16} />
        {content && (
          <Text variant="xs" fw="600" c="gray.9">
            {content}
          </Text>
        )}
      </Group>
    );
  },
);

// Add display name for better debugging
ModificationTag.displayName = 'ModificationTag';
