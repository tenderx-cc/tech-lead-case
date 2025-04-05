import React, { forwardRef, useEffect, useState } from 'react';

import {
  Checkbox,
  Divider,
  Group,
  Button as MantineButton,
  Popover,
  ScrollArea,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import type { PopoverProps } from '@mantine/core/lib/Popover';
import { useClickOutside } from '@mantine/hooks';

import { IconChevronDown } from '@tabler/icons-react';

import { Button } from '../Button/Button';

export type MultiCheckboxOption = {
  value: string;
  label: React.ReactElement | string;
};

export type MultiCheckboxProps = {
  label: string;
  icon?: React.ReactElement;
  values?: MultiCheckboxOption[];
  onChange?: (value: MultiCheckboxOption[]) => void;
  options: MultiCheckboxOption[];
  h?: number;
  popoverProps?: Omit<PopoverProps, 'children'>;
};

export function MultiCheckbox({
  label,
  icon,
  options,
  values: initialValues,
  onChange,
  h,
  popoverProps,
}: MultiCheckboxProps) {
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
  useClickOutside(() => setOpen(false), null, [buttonRef, dropdownRef]);

  const [isOpen, setOpen] = useState(false);
  const [values, setValues] = useState<MultiCheckboxOption[]>(
    initialValues || [],
  );

  const onValueChange = (value: string) => {
    const affectedValue = options.find(option => option.value === value);
    if (affectedValue) {
      if (values.some(v => v.value === value)) {
        const newValues = values.filter(v => v.value !== value);
        onChange?.(newValues);
        setValues(newValues);
      } else {
        const newValues = [...values, affectedValue];
        onChange?.(newValues);
        setValues(newValues);
      }
    }
  };

  const resetValues = () => {
    onChange?.([]);
    setValues([]);
  };

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const toggleOpen = () => setOpen(o => !o);

  return (
    <Popover
      width="244px"
      opened={isOpen}
      shadow="md"
      closeOnEscape
      position="bottom-start"
      {...popoverProps}
    >
      <Popover.Target>
        <MultiCheckboxButton
          ref={setButtonRef}
          label={label}
          icon={icon}
          onClick={toggleOpen}
          isActive={isOpen || values.length > 0}
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
        <MultiCheckboxPopover
          ref={setDropdownRef}
          options={options}
          values={values.map(v => v.value)}
          onChange={onValueChange}
          onReset={resetValues}
          h={h}
        />
      </Popover.Dropdown>
    </Popover>
  );
}

type MultiCheckboxButtonProps = {
  label: React.ReactElement | string;
  icon?: React.ReactElement;
  isActive?: boolean;
  onClick: () => void;
  ref: any;
};

const MultiCheckboxButton = forwardRef<
  HTMLButtonElement,
  MultiCheckboxButtonProps
>(({ label, icon, onClick, isActive }, ref) => {
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
          borderWidth: '1.5px',
          borderColor: `${isActive ? theme.colors.primary[7] : theme.colors.gray[2]}!important`,
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
});

type MultiCheckboxPopoverProps = {
  options: MultiCheckboxOption[];
  values: string[];
  onChange: (value: string) => void;
  onReset: () => void;
  h?: number;
};

const MultiCheckboxPopover = forwardRef<
  HTMLDivElement,
  MultiCheckboxPopoverProps
>(({ options, values, onChange, onReset, h }, ref) => {
  return (
    <Stack spacing="02" p="02" m={0} ref={ref}>
      <ScrollArea h={h} sx={{ overflowX: 'hidden' }}>
        {options.map(option => (
          <CheckboxRow
            key={option.value}
            value={option.value}
            checked={values?.includes(option.value)}
            onChange={onChange}
            label={option.label}
          />
        ))}
      </ScrollArea>
      <Divider
        sx={theme => ({ borderTop: `1px solid ${theme.colors.gray[1]}` })}
      />
      <Group spacing="02" position="right" noWrap>
        <Button variant="subtle" color="gray" size="sm" onClick={onReset}>
          Réinitialiser
        </Button>
      </Group>
    </Stack>
  );
});

type CheckboxRowProps = {
  label: React.ReactElement | string;
  checked?: boolean;
  value: string;
  onChange: (value: string) => void;
};

const CheckboxRow = ({ label, value, checked, onChange }: CheckboxRowProps) => {
  return (
    <Group
      noWrap
      p="02"
      w="100%"
      maw="224px"
      sx={theme => ({
        borderRadius: theme.radius.md,
        ':hover': {
          cursor: 'pointer!important',
          background: 'linear-gradient(90deg, #F7FBFF 50%, #FFFFFF 100%)',
        },
      })}
      onClick={() => onChange(value)}
    >
      <Checkbox checked={checked} value={value} onChange={() => null} />
      {label}
    </Group>
  );
};
