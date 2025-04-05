import { forwardRef } from 'react';

import { mergeStyles } from '../../../utils/mantine';
import {
  Button as MantineButton,
  type MantineColor,
  type MantineSize,
  type MantineTheme,
  type Sx,
  useMantineTheme,
} from '@mantine/core';

type ButtonSizeParam = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant =
  | 'filled'
  | 'subtle'
  | 'light'
  | 'outline'
  | 'white'
  | 'default';

export type ButtonProps = {
  variant?: ButtonVariant;
  color?: MantineColor;
  size?: ButtonSizeParam;
  children?: React.ReactNode;
  sx?: Sx;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any; // allow any other props
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      color = 'primary',
      size = 'md',
      children,
      sx,
      ...rest
    },
    ref,
  ) => {
    const theme = useMantineTheme();
    const sizeParams = getSizeParams(theme)[size as ButtonSizeParam];
    const variantParams = getVariantParams(theme, color)[
      variant as ButtonVariant
    ];
    const defaultSx = {
      color: variantParams.color,
      background: variantParams.background,
      borderColor: variantParams.borderColor,
      fontSize: theme.fontSizes.sm,
      height: sizeParams.height,
      fontWeight: 500,
      lineHeight: 20,
      boxShadow: variantParams.boxShadow,
      '::before': {
        color: variantParams.hover.color,
        background: variantParams.hover.background,
        borderColor: variantParams.hover.borderColor,
        borderRadius: theme.radius.md,
        position: 'absolute' as const,
        content: '""',
        inset: 0,
        zIndex: 1,
        opacity: 0,
        transition: 'opacity 300ms ease-in-out',
      },
      ':hover::before': {
        opacity: 1,
      },
      ':hover': {
        color: variantParams.hover.color,
        background: variantParams.hover.background,
        boxShadow: variantParams.hover.boxShadow,
      },
      ':active': {
        transform: 'none',
        background: variantParams.background,
      },
      ':active::before': {
        opacity: 0,
        transition: 'none',
        background: 'red',
        boxShadow: variantParams.boxShadow,
      },
      ':disabled': {
        color: theme.colors.gray[3],
        background: theme.colors.gray[1],
      },
    };

    const mergedSx = sx ? mergeStyles(theme, defaultSx, sx) : defaultSx;

    return (
      <MantineButton
        ref={ref}
        variant={variant}
        px={sizeParams.paddingX}
        radius={theme.radius.md}
        size={sizeParams.size}
        styles={{
          icon: { width: sizeParams.iconSize, height: sizeParams.iconSize },
          leftIcon: { marginRight: children ? sizeParams.innerSpacing : 0 },
          rightIcon: { marginLeft: sizeParams.innerSpacing },
          inner: {
            zIndex: 2,
            position: 'relative' as const,
          },
        }}
        sx={mergedSx}
        {...rest}
      >
        {children}
      </MantineButton>
    );
  },
);

type SizeParams = {
  iconSize: number;
  paddingX: MantineSize;
  innerSpacing: MantineSize;
  size: MantineSize;
  height: string;
};

const getSizeParams = (
  theme: MantineTheme,
): Record<ButtonSizeParam, SizeParams> => ({
  xs: {
    iconSize: 16,
    paddingX: theme.spacing['02'],
    innerSpacing: theme.spacing['02'],
    size: 'xs',
    height: '26px',
  },
  sm: {
    iconSize: 16,
    paddingX: theme.spacing['03'],
    innerSpacing: theme.spacing['02'],
    size: 'sm',
    height: '32px',
  },
  md: {
    iconSize: 16,
    paddingX: theme.spacing['03'],
    innerSpacing: theme.spacing['02'],
    size: 'md',
    height: '36px',
  },
  lg: {
    iconSize: 16,
    paddingX: theme.spacing['04'],
    innerSpacing: theme.spacing['02'],
    size: 'lg',
    height: '40px',
  },
  xl: {
    iconSize: 16,
    paddingX: theme.spacing['05'],
    innerSpacing: theme.spacing['02'],
    size: 'lg',
    height: '48px',
  },
});

type VariantParams = {
  color?: string;
  background?: string;
  borderColor?: string;
  boxShadow?: string;
  hover: {
    color?: string;
    background?: string;
    borderColor?: string;
    boxShadow?: string;
  };
};

const getVariantParams = (
  theme: MantineTheme,
  color: MantineColor,
): Record<ButtonVariant, VariantParams> => ({
  default: {
    color: theme.colors.gray[9],
    background: 'white',
    borderColor: theme.colors.gray[2],
    boxShadow: theme.shadows.xs,
    hover: {
      color: theme.colors.gray[9],
      background: theme.colors.gray[0],
      borderColor: theme.colors.gray[2],
      boxShadow: theme.shadows.sm,
    },
  },
  filled: {
    background: `linear-gradient(83.76deg, ${theme.colors[color][6]} 0%, ${theme.colors[color][7]} 100%)`,
    borderColor: `#0000001A`,
    boxShadow: theme.shadows.sm,
    hover: {
      boxShadow: theme.shadows.md,
      background: `linear-gradient(83.76deg, ${theme.colors[color][7]} 0%, ${theme.colors[color][6]} 100%)`,
      borderColor: theme.colors[color][8],
    },
  },
  light: {
    color:
      theme.colors[color][
        lightColorShadePerColor[color] ? lightColorShadePerColor[color] : 7
      ],
    background: theme.colors[color][1],
    borderColor: undefined,
    hover: {
      color: theme.colors[color][7],
      background: theme.colors[color][2],
      borderColor: undefined,
    },
  },
  outline: {
    color: theme.colors[color][7],
    background: 'transparent',
    borderColor: theme.colors[color][2],
    hover: {
      color: theme.colors[color][6],
      background: theme.colors[color][0],
      borderColor: theme.colors[color][3],
    },
  },
  subtle: {
    color: theme.colors[color][7],
    background: 'transparent',
    borderColor: undefined,
    hover: {
      color: theme.colors[color][6],
      background: theme.colors[color][1],
      borderColor: undefined,
    },
  },
  white: {
    color: theme.colors[color][6],
    background: 'transparent',
    borderColor: undefined,
    hover: {
      color: theme.colors[color][6],
      background: 'transparent',
      borderColor: undefined,
    },
  },
});

const lightColorShadePerColor: Record<MantineColor, number> = {
  primary: 7,
  red: 6,
  teal: 7,
  gray: 8,
  dark: 7,
  pink: 7,
  grape: 7,
  violet: 7,
  indigo: 7,
  blue: 7,
  cyan: 7,
  green: 7,
  lime: 7,
  yellow: 7,
  orange: 7,
};
