import { useState } from 'react';

import type {
  TextInputProps as MantineTextInputProps,
  MantineTheme,
  Sx,
} from '@mantine/core';
import { TextInput as MantineTextInput, useMantineTheme } from '@mantine/core';

import type { InputWrapperProps } from '../InputWrapper/InputWrapper';
import { InputWrapper } from '../InputWrapper/InputWrapper';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Variant = 'filled' | 'default' | 'white';
type Styles = {
  [key: string]: string | number | Styles;
};
type InputProps = {
  size?: Size;
  variant?: Variant;
  sx?: Sx;
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  fw?: number;
  fs?: string | number;
} & MantineTextInputProps;

export type TextInputProps = Omit<InputWrapperProps, 'children'> & InputProps;

export function TextInput({
  label,
  description,
  error,
  disabled,
  required,
  ...rest
}: TextInputProps) {
  return (
    <InputWrapper
      label={label}
      description={description}
      required={required}
      error={error}
      disabled={disabled}
      {...rest}
    >
      <TextInputWithoutWrapper error={error} disabled={disabled} {...rest} />
    </InputWrapper>
  );
}

function TextInputWithoutWrapper({
  size = 'md',
  variant = 'default',
  disabled = false,
  onFocus,
  onBlur,
  sx,
  leftIcon,
  rightIcon,
  fw = 400,
  fs,
  error,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useMantineTheme();
  const sizeParams = getSizeParams(theme)[size];
  const variantParams = getVariantParams(theme)[variant];

  const errorBorder = !!error && `2px solid ${theme.colors.red[5]}`;

  const styles: Styles = {
    input: {
      height: '20px',
      minHeight: '20px',
      padding: 0,
      border: 'none',
      background: 'transparent',
      margin: 'auto',
      fontWeight: fw,
      fontSize: fs || theme.fontSizes.sm,
      '::placeholder': {
        color: variantParams.placeholder,
      },
      ':disabled': {
        background: 'transparent',
        color: theme.colors.gray[3],
      },
      '&[data-with-icon]': {
        paddingLeft: 0,
      },
    },
    icon: {
      position: 'relative',
      height: theme.spacing['04'],
      width: theme.spacing['04'],
      margin: 'auto',
      marginRight: theme.spacing['02'],
      color: theme.colors.gray[5],
    },
    rightSection: {
      position: 'relative',
      height: theme.spacing['04'],
      width: theme.spacing['04'],
      margin: 'auto',
      marginLeft: theme.spacing['02'],
      color: theme.colors.gray[5],
    },
    wrapper: {
      display: 'flex',
      background: disabled
        ? theme.colors.gray[0]
        : isFocused
          ? variantParams.focus.background
          : variantParams.background,
      borderRadius: theme.radius.md,
      border: disabled
        ? `none`
        : errorBorder ||
          (isFocused ? variantParams.focus.border : variantParams.border),
      height: '100%',
      paddingRight: sizeParams.paddingX,
      paddingLeft: sizeParams.paddingX,
      paddingTop: '3px',
      paddingBottom: '3px',
      ':hover': disabled
        ? {}
        : {
            background: variantParams.hover.background,
            border:
              errorBorder ||
              (isFocused
                ? variantParams.focus.border
                : variantParams.hover.border),
          },
    },
    root: {
      height: sizeParams.height,
    },
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <MantineTextInput
      h={sizeParams.height}
      icon={leftIcon}
      rightSection={rightIcon}
      styles={styles}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      sx={sx}
      {...rest}
    />
  );
}

type SizeParams = {
  paddingX: string;
  height: string;
};

const getSizeParams = (theme: MantineTheme): Record<Size, SizeParams> => ({
  xs: { paddingX: theme.spacing['02'], height: '26px' },
  sm: { paddingX: theme.spacing['03'], height: '32px' },
  md: { paddingX: theme.spacing['03'], height: '36px' },
  lg: { paddingX: theme.spacing['03'], height: '40px' },
});

type VariantParams = {
  placeholder: string;
  color: string;
  background: string;
  border: string;
  hover: {
    background: string;
    border: string;
  };
  focus: {
    background: string;
    border: string;
  };
  disabled?: {
    background: string;
    border: string;
  };
};

const getVariantParams = (
  theme: MantineTheme,
): Record<Variant, VariantParams> => ({
  filled: {
    placeholder: theme.colors.gray[4],
    color: theme.colors.gray[9],
    background: theme.colors.gray[0],
    border: `none`,
    hover: {
      background: theme.colors.gray[1],
      border: `none`,
    },
    focus: {
      background: 'white',
      border: `2px solid ${theme.colors.blue[6]}`,
    },
  },
  default: {
    placeholder: theme.colors.gray[4],
    color: theme.colors.gray[9],
    background: 'white',
    border: `2px solid ${theme.colors.gray[2]}`,
    hover: {
      background: 'white',
      border: `2px solid ${theme.colors.gray[3]}`,
    },
    focus: {
      background: 'white',
      border: `2px solid ${theme.colors.blue[6]}`,
    },
  },
  white: {
    placeholder: theme.colors.gray[4],
    color: theme.colors.gray[9],
    background: 'transparent',
    border: 'none',
    hover: {
      background: 'transparent',
      border: 'none',
    },
    focus: {
      background: 'transparent',
      border: 'none',
    },
    disabled: {
      background: 'transparent',
      border: 'none',
    },
  },
});
