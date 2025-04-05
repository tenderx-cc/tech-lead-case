import type { ReactNode } from 'react';

import type { HoverCardProps, Sx } from '@mantine/core';
import { HoverCard, Text } from '@mantine/core';
import type { HoverCardDropdownProps } from '@mantine/core';

export type TooltipProps = {
  content: string | ReactNode;
  isVisibile?: boolean;
  children: ReactNode;
  dropDownProps?: HoverCardDropdownProps & { sx?: Sx };
  sx?: Sx;
} & HoverCardProps;

export function Tooltip({
  content,
  children,
  isVisibile = true,
  dropDownProps,
  ...rest
}: TooltipProps) {
  return (
    <HoverCard
      withinPortal
      position="bottom"
      openDelay={400}
      styles={theme => ({
        dropdown: {
          background: 'white',
          color: theme.colors.gray[9],
          padding: `${theme.spacing['01']} ${theme.spacing['02']}`,
          borderRadius: theme.radius.md,
          borderColor: theme.colors.gray[0],
          boxShadow: theme.shadows.md,
          visibility: isVisibile ? 'visible' : 'hidden',
        },
      })}
      {...rest}
    >
      <HoverCard.Target>{children}</HoverCard.Target>
      <HoverCard.Dropdown onClick={e => e.stopPropagation()} {...dropDownProps}>
        {typeof content === 'string' ? (
          <Text variant="xs" fw="500">
            {content}
          </Text>
        ) : (
          content
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
