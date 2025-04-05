import type { CSSObject, MantineTheme } from '@mantine/core';

/** @knipignore */
import type { VariantOutput } from '@mantine/styles/lib/theme/functions/fns/variant/variant';

import { mergeStyles } from '.';

const rem = (size: number): string => `${size / 16}rem`;

const MockTheme: MantineTheme = {
  colors: {
    dark: [
      '#C9C9C9',
      '#b8b8b8',
      '#828282',
      '#696969',
      '#424242',
      '#3b3b3b',
      '#2e2e2e',
      '#242424',
      '#1f1f1f',
      '#141414',
    ],

    gray: [
      '#f8f9fa',
      '#f1f3f5',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#868e96',
      '#495057',
      '#343a40',
      '#212529',
    ],

    red: [
      '#fff5f5',
      '#ffe3e3',
      '#ffc9c9',
      '#ffa8a8',
      '#ff8787',
      '#ff6b6b',
      '#fa5252',
      '#f03e3e',
      '#e03131',
      '#c92a2a',
    ],

    pink: [
      '#fff0f6',
      '#ffdeeb',
      '#fcc2d7',
      '#faa2c1',
      '#f783ac',
      '#f06595',
      '#e64980',
      '#d6336c',
      '#c2255c',
      '#a61e4d',
    ],

    grape: [
      '#f8f0fc',
      '#f3d9fa',
      '#eebefa',
      '#e599f7',
      '#da77f2',
      '#cc5de8',
      '#be4bdb',
      '#ae3ec9',
      '#9c36b5',
      '#862e9c',
    ],

    violet: [
      '#f3f0ff',
      '#e5dbff',
      '#d0bfff',
      '#b197fc',
      '#9775fa',
      '#845ef7',
      '#7950f2',
      '#7048e8',
      '#6741d9',
      '#5f3dc4',
    ],

    indigo: [
      '#edf2ff',
      '#dbe4ff',
      '#bac8ff',
      '#91a7ff',
      '#748ffc',
      '#5c7cfa',
      '#4c6ef5',
      '#4263eb',
      '#3b5bdb',
      '#364fc7',
    ],

    blue: [
      '#e7f5ff',
      '#d0ebff',
      '#a5d8ff',
      '#74c0fc',
      '#4dabf7',
      '#339af0',
      '#228be6',
      '#1c7ed6',
      '#1971c2',
      '#1864ab',
    ],

    cyan: [
      '#e3fafc',
      '#c5f6fa',
      '#99e9f2',
      '#66d9e8',
      '#3bc9db',
      '#22b8cf',
      '#15aabf',
      '#1098ad',
      '#0c8599',
      '#0b7285',
    ],

    teal: [
      '#e6fcf5',
      '#c3fae8',
      '#96f2d7',
      '#63e6be',
      '#38d9a9',
      '#20c997',
      '#12b886',
      '#0ca678',
      '#099268',
      '#087f5b',
    ],

    green: [
      '#ebfbee',
      '#d3f9d8',
      '#b2f2bb',
      '#8ce99a',
      '#69db7c',
      '#51cf66',
      '#40c057',
      '#37b24d',
      '#2f9e44',
      '#2b8a3e',
    ],

    lime: [
      '#f4fce3',
      '#e9fac8',
      '#d8f5a2',
      '#c0eb75',
      '#a9e34b',
      '#94d82d',
      '#82c91e',
      '#74b816',
      '#66a80f',
      '#5c940d',
    ],

    yellow: [
      '#fff9db',
      '#fff3bf',
      '#ffec99',
      '#ffe066',
      '#ffd43b',
      '#fcc419',
      '#fab005',
      '#f59f00',
      '#f08c00',
      '#e67700',
    ],

    orange: [
      '#fff4e6',
      '#ffe8cc',
      '#ffd8a8',
      '#ffc078',
      '#ffa94d',
      '#ff922b',
      '#fd7e14',
      '#f76707',
      '#e8590c',
      '#d9480f',
    ],
  },
  dir: 'ltr',
  primaryShade: 0,
  focusRing: 'auto',
  defaultRadius: 0,
  loader: 'bars',
  colorScheme: 'light',
  white: '',
  black: '',
  fontFamily: undefined,
  lineHeight: undefined,
  transitionTimingFunction: undefined,
  fontFamilyMonospace: undefined,
  primaryColor: 'dark',
  respectReducedMotion: false,
  cursorType: 'default',
  defaultGradient: { from: 'blue', to: 'cyan', deg: 45 },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(16),
    xl: rem(32),
  },
  spacing: {
    xs: rem(10),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(32),
  },
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },
  shadows: {
    xs: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), 0 ${rem(1)} ${rem(2)} rgba(0, 0, 0, 0.1)`,
    sm: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(10)} ${rem(
      15,
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(7)} ${rem(7)} ${rem(-5)}`,
    md: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(20)} ${rem(
      25,
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(10)} ${rem(10)} ${rem(-5)}`,
    lg: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(28)} ${rem(
      23,
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(12)} ${rem(12)} ${rem(-7)}`,
    xl: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(36)} ${rem(
      28,
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(17)} ${rem(17)} ${rem(-7)}`,
  },
  headings: {
    fontFamily: undefined,
    fontWeight: undefined,
    sizes: {
      h1: {
        fontSize: '4px',
        lineHeight: '1.3',
        fontWeight: undefined,
      },
      h2: { fontSize: '4px', fontWeight: undefined, lineHeight: '1.35' },
      h3: { fontSize: '4px', fontWeight: undefined, lineHeight: '1.4' },
      h4: { fontSize: '4px', fontWeight: undefined, lineHeight: '1.45' },
      h5: { fontSize: '4px', fontWeight: undefined, lineHeight: '1.5' },
      h6: { fontSize: '4px', fontWeight: undefined, lineHeight: '1.5' },
    },
  },
  other: {
    gradients: {
      aiVertical: 'linear-gradient(90deg, #FFC593 0%, #BC7198 100%)',
      aiHorizontal: 'linear-gradient(90deg, #FFC593 0%, #BC7198 100%)',
      aiHorizontalLight: 'linear-gradient(90deg, #FFC593 0%, #BC7198 100%)',
      primary: 'linear-gradient(90deg, #FFC593 0%, #BC7198 100%)',
      backgroundLight: 'linear-gradient(90deg, #FFC593 0%, #BC7198 100%)',
      backgroundMedium: 'linear-gradient(90deg, #FFC593 0%, #BC7198 100%)',
    },
  },
  datesLocale: '',
  globalStyles: function (): CSSObject {
    throw new Error('Function not implemented.');
  },
  activeStyles: {},
  components: {},
  focusRingStyles: {
    styles: function (): CSSObject {
      throw new Error('Function not implemented.');
    },
    resetStyles: function (): CSSObject {
      throw new Error('Function not implemented.');
    },
    inputStyles: function (): CSSObject {
      throw new Error('Function not implemented.');
    },
  },
  fn: {
    fontStyles: function () {
      throw new Error('Function not implemented.');
    },
    focusStyles: function () {
      throw new Error('Function not implemented.');
    },
    cover: function () {
      throw new Error('Function not implemented.');
    },
    themeColor: function (): string {
      throw new Error('Function not implemented.');
    },
    rgba: function (): string {
      throw new Error('Function not implemented.');
    },
    linearGradient: function (): string {
      throw new Error('Function not implemented.');
    },
    radialGradient: function (): string {
      throw new Error('Function not implemented.');
    },
    gradient: function (): string {
      throw new Error('Function not implemented.');
    },
    smallerThan: function (): string {
      throw new Error('Function not implemented.');
    },
    largerThan: function (): string {
      throw new Error('Function not implemented.');
    },
    lighten: function (): string {
      throw new Error('Function not implemented.');
    },
    darken: function (): string {
      throw new Error('Function not implemented.');
    },
    radius: function (): string | number {
      throw new Error('Function not implemented.');
    },
    variant: function (): VariantOutput {
      throw new Error('Function not implemented.');
    },
    primaryShade: function (): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 {
      throw new Error('Function not implemented.');
    },
    hover: function () {
      throw new Error('Function not implemented.');
    },
    primaryColor: function (): string {
      throw new Error('Function not implemented.');
    },
    placeholderStyles: function () {
      throw new Error('Function not implemented.');
    },
    dimmed: function (): string {
      throw new Error('Function not implemented.');
    },
  },
};

describe('mergeStyles', () => {
  const defaultStyles = {
    color: 'black',
    background: 'white',
  };

  it('should merge object styles correctly', () => {
    const customStyles = {
      background: 'blue',
      borderColor: 'red',
    };
    const expected = {
      color: 'black',
      background: 'blue',
      borderColor: 'red',
    };
    expect(mergeStyles(MockTheme, defaultStyles, customStyles)).toEqual(
      expected,
    );
  });

  it('should execute and merge function styles correctly', () => {
    const customStyles = (theme: MantineTheme) => ({
      color: theme.colors.blue[7],
      background: theme.colors.gray[7],
    });

    const expected = {
      color: '#1c7ed6',
      background: '#495057',
      // borderColor is not overwritten or provided here, so it's not expected in the result
    };
    expect(mergeStyles(MockTheme, defaultStyles, customStyles)).toEqual(
      expected,
    );
  });

  it('should return default styles when customStyles is not provided', () => {
    expect(mergeStyles(MockTheme, defaultStyles, {})).toEqual(defaultStyles);
  });

  it('should handle customStyles as an empty function', () => {
    const customStyles = () => ({});
    const expected = {
      color: 'black',
      background: 'white',
    };
    expect(mergeStyles(MockTheme, defaultStyles, customStyles)).toEqual(
      expected,
    );
  });
});
