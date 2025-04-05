import React from 'react';

import { Group, Text, ThemeIcon } from '@mantine/core';

export type DividerTitleColor = 'gray' | 'dark' | 'red' | 'primary' | 'orange';

type BrandedCardTitleProps = {
  icon?: React.ReactNode;
  title: string;
  color: DividerTitleColor;
  borderTopLeftRadius?: string;
};
export const BrandedCardTitle = ({
  title,
  icon,
  color,
  borderTopLeftRadius,
}: BrandedCardTitleProps) => {
  const { background, boxShadow, iconColor, textColor } =
    getColorConfig()[color];
  return (
    <Group
      noWrap
      w="fit-content"
      h="32px"
      pl="04"
      pr="05"
      spacing="01"
      sx={theme => ({
        borderTopLeftRadius: borderTopLeftRadius || theme.radius.md,
        borderBottomRightRadius: theme.radius.lg,
        background,
        boxShadow,
      })}
    >
      {icon && (
        <ThemeIcon bg="transparent" c={iconColor} size="sm">
          {icon}
        </ThemeIcon>
      )}
      <Text variant="xs" fw="500" c={textColor}>
        {title}
      </Text>
    </Group>
  );
};
type ColorConfig = {
  background: string;
  iconColor: string;
  textColor: string;
  boxShadow: string;
};
const getColorConfig = (): Record<DividerTitleColor, ColorConfig> => ({
  dark: {
    background: 'linear-gradient(262deg, #EDEDF1 51.32%, #D8D9DF 100%)',
    iconColor: 'gray.4',
    textColor: 'gray.9',
    boxShadow: '0px -4px 4px 0px rgba(0, 0, 0, 0.04) inset',
  },
  red: {
    background: 'linear-gradient(262deg, #FFF6F5 0%, #FEE9E6 100%)',
    iconColor: 'red.4',
    textColor: 'red.6',
    boxShadow: '0px -4px 4px 0px rgba(146, 34, 34, 0.03) inset',
  },
  gray: {
    background: 'linear-gradient(262deg, #F7F7F8 0%, #EDEDF1 100%);',
    iconColor: 'gray.4',
    textColor: 'gray.8',
    boxShadow: '0px -4px 4px 0px rgba(0, 0, 0, 0.03) inset',
  },
  primary: {
    background: 'linear-gradient(262deg, #F0F8FF 0%, #E5F2FE 100%)',
    iconColor: 'primary.4',
    textColor: 'primary.6',
    boxShadow: '0px -4px 4px 0px rgba(146, 34, 34, 0.03) inset',
  },
  orange: {
    background: ' linear-gradient(86deg, #FFF4E6 0%, #FFF9F1 100%)',
    iconColor: 'orange.4',
    textColor: 'orange.7',
    boxShadow: '0px -4px 4px 0px rgba(146, 34, 34, 0.03) inset',
  },
});
