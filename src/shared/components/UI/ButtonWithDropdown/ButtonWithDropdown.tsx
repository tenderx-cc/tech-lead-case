import { useState } from 'react';

import { Box, Group, Popover, Stack, Text } from '@mantine/core';
import type { FloatingPosition } from '@mantine/core/lib/Floating';
import { useClickOutside } from '@mantine/hooks';

import { IconChevronDown, IconX } from '@tabler/icons-react';

import { Button, type ButtonProps } from '../Button/Button';

export type ButtonWithDropdownProps = {
  opened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  items?: DropdownItemProps[];
  buttonProps?: ButtonProps;
  label: string;
  drowdownLabel?: string;
  dropdownPosition?: FloatingPosition;
};

export function ButtonWithDropdown({
  items,
  buttonProps,
  label,
  drowdownLabel,
  dropdownPosition = 'bottom-end',
}: ButtonWithDropdownProps) {
  const [isOpen, setOpen] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
  useClickOutside(() => setOpen(false), null, [buttonRef, dropdownRef]);

  return (
    <Popover
      width="244px"
      opened={isOpen}
      shadow="md"
      closeOnEscape
      closeOnClickOutside
      position={dropdownPosition}
    >
      <Popover.Target>
        <Button
          ref={setButtonRef}
          w="fit-content"
          {...buttonProps}
          rightIcon={<IconChevronDown />}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(o => !o);
          }}
        >
          {label}
        </Button>
      </Popover.Target>
      <Popover.Dropdown
        p={0}
        m={0}
        sx={theme => ({
          border: `1px solid ${theme.colors.gray[2]}`,
          borderRadius: theme.radius.md,
          boxShadow: theme.shadows.regular,
          cursor: 'default',
        })}
      >
        <Stack ref={setDropdownRef} spacing="0" p="01" m={0}>
          <Group px="02" py="01" c="gray.6" noWrap position="apart">
            <Text variant="xs" fw={400}>
              {drowdownLabel}
            </Text>
            <Box
              onClick={() => setOpen(false)}
              sx={{
                ':hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <IconX size={14} />
            </Box>
          </Group>
          {items?.map((item, index) => (
            <DropdownItem
              key={index}
              {...item}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
            />
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

type DropdownItemProps = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

const DropdownItem = ({ label, icon, onClick }: DropdownItemProps) => {
  return (
    <Group
      px="02"
      py="01"
      spacing="02"
      color="red.7"
      sx={theme => ({
        borderRadius: theme.radius.sm,
        ':hover': {
          cursor: 'pointer',
          background: theme.colors.gray[0],
        },
      })}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
    >
      {icon}
      <Text variant="sm" fw={400} c="gray.9">
        {label}
      </Text>
    </Group>
  );
};
