import React, { forwardRef, useEffect, useState } from 'react';

import {
  Divider,
  Group,
  Button as MantineButton,
  Popover,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { DatePicker as MantineDatePicker } from '@mantine/dates';
import { useClickOutside } from '@mantine/hooks';

import { IconChevronDown } from '@tabler/icons-react';
import 'dayjs/locale/fr';

import { Button } from '../Button/Button';

export type DatePickerProps = {
  label: string;
  icon?: React.ReactElement;
  value?: Date;
  onChange?: (value?: Date) => void;
};

export function DatePicker({
  label,
  icon,
  value: initialValues,
  onChange,
}: DatePickerProps) {
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<Date | undefined>(
    initialValues || undefined,
  );

  useClickOutside(() => setOpen(false), null, [buttonRef, dropdownRef]);

  const [isOpen, setOpen] = useState(false);

  const onValueChange = (newValue: Date) => {
    onChange && onChange(newValue);
    setValue(newValue);
  };

  const resetValue = () => {
    setValue(undefined);
    onChange && onChange(undefined);
  };

  useEffect(() => {
    setValue(initialValues);
  }, [initialValues]);

  const toggleOpen = () => setOpen(o => !o);
  return (
    <Popover opened={isOpen} shadow="md" closeOnEscape position="bottom-start">
      <Popover.Target>
        <DatePickerButton
          ref={setButtonRef}
          label={label}
          icon={icon}
          onClick={toggleOpen}
          isActive={isOpen || !!value}
        />
      </Popover.Target>
      <Popover.Dropdown
        p={0}
        m={0}
        sx={theme => ({
          borderRadius: theme.radius.md,
          boxShadow: theme.shadows.regular,
        })}
      >
        <DatePickerPopover
          ref={setDropdownRef}
          value={value}
          onChange={onValueChange}
          onReset={resetValue}
          onApply={() => setOpen(false)}
        />
      </Popover.Dropdown>
    </Popover>
  );
}

type DatePickerButtonProps = {
  label: React.ReactElement | string;
  icon?: React.ReactElement;
  isActive?: boolean;
  onClick: () => void;
  ref: any;
};

const DatePickerButton = forwardRef<HTMLButtonElement, DatePickerButtonProps>(
  ({ label, icon, onClick, isActive }, ref) => {
    const theme = useMantineTheme();

    return (
      <MantineButton
        ref={ref}
        w="fit-content"
        onClick={onClick}
        variant="default"
        size="xs"
        leftIcon={icon}
        px={theme.spacing['02']}
        rightIcon={<IconChevronDown />}
        styles={theme => ({
          root: {
            color: theme.colors.gray[9],
            borderRadius: theme.radius.md,
            borderColor: `${isActive ? theme.colors.primary[7] : theme.colors.gray[2]}!important`,
            borderWidth: '1.5px',
            background: 'white',
            ':hover': {
              background: isActive
                ? theme.colors.primary[1]
                : theme.colors.gray[0],
            },
          },
          icon: {
            width: '16px',
            height: '16px',
          },
          leftIcon: {
            marginRight: theme.spacing['02'],
            color: isActive ? theme.colors.primary[7] : theme.colors.gray[6],
          },
          rightIcon: {
            marginLeft: theme.spacing['02'],
            color: theme.colors.gray[6],
          },
          inner: {
            zIndex: 2,
            position: 'relative' as const,
          },
        })}
        sx={{
          borderColor: isActive ? 'primary' : 'gray',
          fontSize: theme.fontSizes.sm,
          height: '26px',
          fontWeight: 500,
          lineHeight: 20,
          boxShadow: theme.shadows.sm,
          ':active': {
            transform: 'none',
          },
        }}
      >
        {label}
      </MantineButton>
    );
  },
);

type DatePickerPopoverProps = {
  value?: Date;
  onChange: (value: Date) => void;
  onReset: () => void;
  onApply: () => void;
};

const DatePickerPopover = forwardRef<HTMLDivElement, DatePickerPopoverProps>(
  ({ value, onChange, onReset, onApply }, ref) => {
    return (
      <Stack spacing="02" p="02" m={0} ref={ref}>
        <MantineDatePicker value={value} onChange={onChange} locale="fr" />
        <Divider
          sx={theme => ({ borderTop: `1px solid ${theme.colors.gray[1]}` })}
        />
        <Group spacing="02" position="right" noWrap>
          <Button variant="subtle" color="gray" size="sm" onClick={onReset}>
            Réinitialiser
          </Button>
          <Button variant="light" color="primary" size="sm" onClick={onApply}>
            Appliquer
          </Button>
        </Group>
      </Stack>
    );
  },
);
