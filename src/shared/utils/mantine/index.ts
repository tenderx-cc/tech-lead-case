import type { MantineTheme, Sx } from '@mantine/core';

export const mergeStyles = (
  theme: MantineTheme,
  defaultStyles: Sx,
  customStyles: Sx,
) => {
  if (typeof customStyles === 'function') {
    // Execute the function if sx is a function, passing the theme
    return { ...defaultStyles, ...customStyles(theme) };
  }
  // Merge objects if sx is an object
  return { ...defaultStyles, ...customStyles };
};
