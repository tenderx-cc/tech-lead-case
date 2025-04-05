import type { MantineTheme } from '@mantine/core';
import { ThemeIcon, useMantineTheme } from '@mantine/core';
import type { DatePickerInputProps } from '@mantine/dates';
import { DatePickerInput } from '@mantine/dates';

import { IconCalendar } from '@tabler/icons-react';

import { InputWrapper } from '../InputWrapper/InputWrapper';

export type DateInputProps = {
  label: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
} & DatePickerInputProps;

export function DateInput({
  label,
  required,
  error,
  disabled,
  ...rest
}: DateInputProps) {
  const theme = useMantineTheme();
  const errorBorder = !!error && `2px solid ${theme.colors.red[5]}`;
  const hoverBorder = `2px solid ${theme.colors.gray[3]}`;
  const focusBorder = `2px solid ${theme.colors.blue[6]}`;

  const styles = (theme: MantineTheme) => ({
    input: {
      border: disabled
        ? `none`
        : errorBorder || `2px solid ${theme.colors.gray[2]}`,
      height: 20,
      span: {
        color: theme.colors.gray[4],
      },
      ':hover': {
        border: hoverBorder,
      },
      ':focus': {
        border: focusBorder,
      },
    },
  });
  return (
    <InputWrapper
      label={label}
      required={required}
      error={error}
      disabled={disabled}
    >
      <DatePickerInput
        required
        w="100%"
        defaultDate={new Date()}
        popoverProps={{
          withinPortal: true,
        }}
        locale="fr-FR"
        valueFormat="DD/MM/YYYY"
        radius="md"
        disabled={disabled}
        icon={
          <ThemeIcon size="sm" color="transparent" c="primary.7">
            <IconCalendar size={16} stroke={2} />
          </ThemeIcon>
        }
        styles={styles}
        {...rest}
      />
    </InputWrapper>
  );
}
