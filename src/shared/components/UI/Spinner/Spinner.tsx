import { createStyles } from '@mantine/core';

import { keyframes } from '@emotion/react';
import { IconLoader } from '@tabler/icons-react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export function Spinner() {
  const useStyles = createStyles({
    spinner: {
      animation: `${spin} 2s linear infinite`,
    },
  });

  const { classes } = useStyles();

  return <IconLoader size={16} className={classes.spinner} />;
}
