import { Group, Stack, Text, ThemeIcon, useMantineTheme } from '@mantine/core';

import { IconAsterisk } from '@tabler/icons-react';

export type InputWrapperProps = {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactElement;
};

export function InputWrapper({
  label,
  description,
  error,
  required = false,
  disabled,
  children,
  ...rest
}: InputWrapperProps) {
  const theme = useMantineTheme();

  const hideLabel = !label && !required && !description;
  const labelColor = disabled ? theme.colors.gray[3] : theme.colors.gray[9];
  const descriptionColor = disabled
    ? theme.colors.gray[3]
    : theme.colors.gray[5];

  return (
    <Stack spacing={theme.spacing['02']} h="100%" {...rest}>
      <Stack
        spacing={theme.spacing['02']}
        sx={{ display: hideLabel ? 'none' : 'initial' }}
      >
        <Group spacing={theme.spacing['01']}>
          {label && (
            <Text weight={500} size="sm" c={labelColor} lh="20px">
              {label}
            </Text>
          )}
          {required && (
            <ThemeIcon
              radius={theme.radius.xl}
              size={theme.spacing['03']}
              variant="light"
              sx={{
                backgroundColor: theme.colors.primary[1],
                color: theme.colors.primary[6],
              }}
            >
              <IconAsterisk size={8} stroke={3} />
            </ThemeIcon>
          )}
        </Group>
        {description && (
          <Text weight={400} size="xs" c={descriptionColor} lh="20px">
            {description}
          </Text>
        )}
      </Stack>
      {children}
      {error && (
        <Text weight={500} size="xs" c={theme.colors.red[5]} lh="20px">
          {error}
        </Text>
      )}
    </Stack>
  );
}
