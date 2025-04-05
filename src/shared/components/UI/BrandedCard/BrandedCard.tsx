import React, { forwardRef } from 'react';

import type { MantineTheme, StackProps } from '@mantine/core';
import { Box, Stack, useMantineTheme } from '@mantine/core';

import type { DividerTitleColor } from './BrandedCardTitle';
import { BrandedCardTitle } from './BrandedCardTitle';

type BrandedCardVariant = 'default' | 'filled' | 'outlined';

export type BrandedCardProps = {
  variant?: BrandedCardVariant;
  title: string;
  icon?: React.ReactNode;
  color?: DividerTitleColor;
  children: React.ReactNode;
} & StackProps;

export const BrandedCard = forwardRef(
  (
    {
      title,
      icon,
      color = 'gray',
      variant = 'default',
      children,
      ...rest
    }: BrandedCardProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const theme = useMantineTheme();
    const {
      borderWidth,
      background,
      borderColor,
      boxShadow,
      titleOffset,
      titleBorderTopLeftRadius,
    } = getVariantConfig(theme, color)[variant];
    return (
      <Stack
        spacing={0}
        ref={ref}
        sx={theme => ({
          display: 'inline-flex', // Ensures the width adjusts based on the content
          flexDirection: 'column',
          borderWidth,
          background,
          borderStyle: 'solid',
          borderColor,
          boxShadow,
          borderRadius: theme.radius.md,
        })}
        {...rest}
      >
        <Box mt={titleOffset} ml={titleOffset} mr="04">
          <BrandedCardTitle
            {...{ title, icon, color }}
            borderTopLeftRadius={titleBorderTopLeftRadius}
          />
        </Box>
        <Box p="05" pt="04">
          {children}
        </Box>
      </Stack>
    );
  },
);

type VariantConfig = {
  borderWidth: string;
  background: string;
  borderColor: string;
  boxShadow?: string;
  titleOffset: string;
  titleBorderTopLeftRadius?: string;
};

const getVariantConfig = (
  theme: MantineTheme,
  color: DividerTitleColor,
): Record<BrandedCardVariant, VariantConfig> => ({
  default: {
    borderWidth: '1px',
    background: 'white',
    borderColor: theme.colors['gray'][1],
    titleOffset: '-1px',
  },
  filled: {
    borderWidth: '0px',
    background: 'linear-gradient(180deg, #F7F7F8 16.4%, #FFF 100%)',
    borderColor: theme.colors['gray'][1],
    titleOffset: '-1px',
  },
  outlined: {
    borderWidth: '4px',
    background: 'white',
    borderColor:
      theme.colors[color][color === 'orange' || color === 'dark' ? 0 : 1],
    boxShadow: `0 0 0 1px ${theme.colors[color][2]}, ${theme.shadows.xs}`,
    titleOffset: '0px',
    titleBorderTopLeftRadius: theme.radius.sm,
  },
});
