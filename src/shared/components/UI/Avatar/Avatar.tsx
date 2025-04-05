import {
  Avatar as MantineAvatar,
  type MantineColor,
  type MantineTheme,
  useMantineTheme,
} from '@mantine/core';

type SizeParam = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Variant = 'filled' | 'light' | 'outline';

export type AvatarProps = {
  variant?: Variant;
  radius?: SizeParam;
  size?: SizeParam;
  color?: MantineColor;
  isDisabled?: boolean;
  src?: string;
  [key: string]: any; // allow any other props
};

export function Avatar({
  variant = 'light',
  size = 'md',
  color = 'primary',
  isDisabled = false,
  radius = 'xl',
  src,
  children,
  ...rest
}: AvatarProps) {
  const theme = useMantineTheme();
  const sizeParams = getSizeParams()[size];
  const variantParams = getVariantParams(theme, color, isDisabled)[variant];

  return (
    <MantineAvatar
      variant={variant}
      radius={radius === 'xl' ? '100%' : radius}
      styles={{
        placeholder: {
          color: variantParams.color,
          fontSize: sizeParams.fontSize,
          background: variantParams.background,
          borderColor: variantParams.borderColor,
        },
        placeholderIcon: {
          color: variantParams.color,
        },
        root: {
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
        },
      }}
      src={src}
      sx={{
        minWidth: sizeParams.size,
        width: sizeParams.size,
        height: sizeParams.size,
        '::after': {
          display: src ? 'visible' : 'none',
          content: '""',
          position: 'absolute' as const,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: radius === 'xl' ? '100%' : theme.radius[radius],
          border: `1px solid ${theme.colors.gray[9]}`,
          zIndex: 10,
          opacity: 0.1,
        },
      }}
      {...rest}
    >
      {children}
    </MantineAvatar>
  );
}

type SizeParams = {
  size: string;
  iconSize: string;
  fontSize: string;
};

const getSizeParams = (): Record<SizeParam, SizeParams> => ({
  xs: {
    size: '14px',
    iconSize: '8px',
    fontSize: '8px',
  },
  sm: {
    size: '16px',
    iconSize: '12px',
    fontSize: '8px',
  },
  md: {
    size: '24px',
    iconSize: '12px',
    fontSize: '10px',
  },
  lg: {
    size: '32px',
    iconSize: '12px',
    fontSize: '12px',
  },
  xl: {
    size: '84px',
    iconSize: '12px',
    fontSize: '26px',
  },
});

type VariantParams = {
  color: string;
  background: string;
  borderColor?: string;
};

const getVariantParams = (
  theme: MantineTheme,
  color: MantineColor,
  isDisabled: boolean,
): Record<Variant, VariantParams> => ({
  filled: {
    color: isDisabled ? theme.colors.gray[5] : 'white',
    background: isDisabled ? theme.colors.gray[3] : theme.colors[color][6],
  },
  light: {
    color: isDisabled ? theme.colors.gray[3] : theme.colors.gray[9],
    background: isDisabled ? theme.colors.gray[1] : theme.colors[color][1],
  },
  outline: {
    color: isDisabled ? theme.colors.gray[3] : theme.colors[color][7],
    borderColor: isDisabled ? theme.colors.gray[3] : theme.colors[color][7],
    background: 'transparent',
  },
});
