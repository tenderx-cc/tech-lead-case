import type { MantineTheme, Sx } from '@mantine/core';
import { Badge, Text, useMantineTheme } from '@mantine/core';

type CounterSizeParam = 'xs' | 'sm';
type CounterVariant = 'filled' | 'subtle';
type CounterColor = 'primary' | 'gray';

export type CounterProps = {
  variant?: CounterVariant;
  color?: CounterColor;
  size?: CounterSizeParam;
  value?: number;
  sx?: Sx;
  [key: string]: any; // allow any other props
};

export function Counter({
  variant = 'filled',
  color = 'primary',
  size = 'sm',
  sx,
  value,
  ...rest
}: CounterProps) {
  const theme = useMantineTheme();
  if (!value) {
    return;
  }
  const sizeParams = getSizeParams(theme)[size];
  const variantParams = getVariantParams(theme, color)[variant];
  return (
    <Badge
      bg={variantParams.background}
      c={variantParams.color}
      variant={variant}
      w={value > 9 ? 'fit-content' : sizeParams.size}
      h={sizeParams.size}
      px={value > 9 ? '02' : '01'}
      sx={sx}
      {...rest}
    >
      <Text fz={sizeParams} fw={sizeParams.fontWeight}>
        {value}
      </Text>
    </Badge>
  );
}

type SizeParams = {
  fontSize: string;
  fontWeight: number;
  size: string;
};

const getSizeParams = (
  theme: MantineTheme,
): Record<CounterSizeParam, SizeParams> => ({
  xs: {
    fontSize: theme.fontSizes.xs,
    fontWeight: 600,
    size: '18px',
  },
  sm: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    size: '20px',
  },
});

type VariantParams = {
  color: string;
  background: string;
};

const getVariantParams = (
  theme: MantineTheme,
  color: CounterColor,
): Record<CounterVariant, VariantParams> => ({
  filled: {
    color: 'white',
    background: theme.colors[color][6],
  },
  subtle: {
    color: theme.colors[color][8],
    background: theme.colors[color][1],
  },
});
