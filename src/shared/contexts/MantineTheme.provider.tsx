import type { MantineThemeOverride } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

// TODO: put this text gradient style in theme provider
// const aiTextGradient = {
//   width: 'fit-content',
//   color: 'transparent',
//   background: theme.other.gradients.aiHorizontal,
//   backgroundClip: 'text',
// };

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'primary',
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  spacing: {
    // todo: delete once the migration to IMB's spacing system is done
    xxs: '8px',
    xs: '10px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '52px',
    // IBM's spacing system
    '00': '2px',
    '01': '4px',
    '02': '8px',
    '03': '12px',
    '04': '16px',
    '05': '24px',
    '06': '32px',
    '07': '40px',
    '08': '48px',
    '09': '64px',
    '10': '80px',
    '11': '96px',
    '12': '128px',
    '13': '192px',
    '14': '256px',
  },
  fontFamily: 'Inter, SF Pro display, Arial, Helvetica, sans-serif',
  headings: {
    fontFamily: 'Inter, SF Pro display, monospace',
    sizes: {
      h1: {
        fontSize: '32px',
        fontWeight: 500,
        lineHeight: '36px',
      },
      h2: {
        fontSize: '24px',
        fontWeight: 500,
        lineHeight: '28px',
      },
      h3: {
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '28px',
      },
      h4: {
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '22px',
      },
      h5: {
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '22px',
      },
      h6: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
      },
    },
  },
  colors: {
    primary: [
      '#F7FBFF',
      '#E5F2FE',
      '#CCE5FD',
      '#7CC2FB',
      '#4EA7F7',
      '#2E84F2',
      '#1A65E5',
      '#1951C6',
      '#19409A',
      '#193976',
    ],
    gray: [
      '#F7F7F8',
      '#EDEDF1',
      '#D8D9DF',
      '#B6B7C3',
      '#8E90A2',
      '#707287',
      '#5A5B6F',
      '#4A4A5A',
      '#40414C',
      '#1C1C21',
    ],
    red: [
      '#FFF6F5',
      '#FEE9E6',
      '#FDD4CE',
      '#FB8A7B',
      '#F7705E',
      '#F03E3E',
      '#CD2C2C',
      '#B12424',
      '#922222',
      '#420D0D',
    ],
    teal: [
      '#EFFCF8',
      '#DDF7EB',
      '#D1FAE6',
      '#8AE5C3',
      '#35D29B',
      '#11B883',
      '#06956B',
      '#057759',
      '#075E47',
      '#064E3C',
    ],
  },
  shadows: {
    xs: '0px 1px 4px -2px rgba(0, 0, 0, 0.04)',
    sm: '0px 1px 2px -2px rgba(0, 0, 0, 0.01), 0px 2px 8px -2px rgba(0, 0, 0, 0.06)',
    md: '0px 2px 4px -2px rgba(0, 0, 0, 0.04), 0px 4px 12px -2px rgba(0, 0, 0, 0.04)',
    lg: '0px 4px 6px -2px rgba(0, 0, 0, 0.02), 0px 10px 16px -4px rgba(0, 0, 0, 0.04)',
    xl: '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)',
    regular: '0px 2px 4px -2px #0000000A, 0px 4px 12px -2px #0000000A',
  },
  cursorType: 'pointer',
  components: {
    Text: {
      variants: {
        xs: theme => ({
          root: {
            fontSize: theme.fontSizes.xs,
            lineHeight: '18px',
          },
        }),
        sm: theme => ({
          root: {
            fontSize: theme.fontSizes.sm,
            lineHeight: '20px',
          },
        }),
        md: theme => ({
          root: {
            fontSize: theme.fontSizes.md,
            lineHeight: '24px',
          },
        }),
        lg: theme => ({
          root: {
            fontSize: theme.fontSizes.lg,
            lineHeight: '22px',
          },
        }),
        xl: theme => ({
          root: {
            fontSize: theme.fontSizes.xl,
            lineHeight: '24px',
          },
        }),
      },
    },
    Modal: {
      styles: {
        inner: {
          zIndex: 205,
        },
        content: {
          zIndex: 205,
        },
      },
    },
  },
  other: {
    gradients: {
      aiVertical: `linear-gradient(0deg, #CC5DE8 34%, #6B61E6 71%, #1A65E5 100%)`,
      aiHorizontal: `linear-gradient(264.41deg, #CC5DE8 7.47%, #6B61E6 47.85%, #1A65E5 98.22%)`,
      aiHorizontalLight: `linear-gradient(264.41deg, rgba(204, 93, 232, 0.5) 7.47%, rgba(107, 97, 230, 0.5) 47.85%, rgba(26, 101, 229, 0.5) 98.22%)`,
      primary: `linear-gradient(84.2deg, #1A65E5 0%, #1951C6 100%)`,
      backgroundLight: `linear-gradient(180deg, #F5FAFF 6.03%, #FFF 11.67%)`,
      backgroundMedium: `linear-gradient(180deg, #F5FAFF 49.87%, rgba(255, 255, 255, 0.00) 100%)`,
    },
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
}
