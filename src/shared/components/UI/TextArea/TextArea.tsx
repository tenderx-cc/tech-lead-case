import { useState } from 'react';

import type { TextareaProps as MantineTextAreaProps } from '@mantine/core';
import {
  Textarea as MantineTextArea,
  type MantineTheme,
  type Sx,
  useMantineTheme,
} from '@mantine/core';

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
  fw?: number;
  fs?: string | number;
} & MantineTextAreaProps;

export type TextAreaProps = Omit<InputWrapperProps, 'children'> & InputProps;

export function TextArea({
  label,
  description,
  error,
  disabled,
  required,
  minRows,
  maxRows,
  ...rest
}: TextAreaProps) {
  return (
    <InputWrapper
      label={label}
      description={description}
      required={required}
      error={error}
      disabled={disabled}
      {...rest}
    >
      <TextAreaWithoutWrapper
        error={error}
        disabled={disabled}
        minRows={minRows}
        maxRows={maxRows}
        {...rest}
      />
    </InputWrapper>
  );
}

function TextAreaWithoutWrapper({
  size = 'md',
  variant = 'default',
  onFocus,
  onBlur,
  sx,
  disabled = false,
  fw = 400,
  fs,
  error,
  minRows,
  maxRows = 5,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useMantineTheme();
  const sizeParams = getSizeParams(theme)[size];
  const variantParams = getVariantParams(theme)[variant];

  const errorBorder = !!error && `2px solid ${theme.colors.red[5]}`;
  const styles: Styles = {
    input: {
      padding: '0px !important',
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
    },
    icon: {
      position: 'relative',
      height: theme.spacing['04'],
      width: theme.spacing['04'],
      marginRight: theme.spacing['02'],
      color: theme.colors.gray[5],
    },
    rightSection: {
      position: 'relative',
      marginLeft: theme.spacing['02'],
    },
    wrapper: {
      display: 'flex',
      background: isFocused
        ? variantParams.focus.background
        : variantParams.background,
      borderRadius: theme.radius.md,
      outline:
        errorBorder ||
        (isFocused ? variantParams.focus.border : variantParams.border),
      height: '100%',
      padding: sizeParams.padding,
      ':hover': disabled
        ? {}
        : {
            background: variantParams.hover.background,
            outline:
              errorBorder ||
              (isFocused
                ? variantParams.focus.border
                : variantParams.hover.border),
          },
    },
    root: {},
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <MantineTextArea
      styles={styles}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autosize
      minRows={minRows}
      maxRows={maxRows}
      sx={sx}
      {...rest}
    />
  );
}

type SizeParams = {
  padding: string;
};

const getSizeParams = (theme: MantineTheme): Record<Size, SizeParams> => ({
  xs: { padding: theme.spacing['02'] },
  sm: { padding: theme.spacing['03'] },
  md: { padding: theme.spacing['03'] },
  lg: { padding: theme.spacing['03'] },
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
  },
});
