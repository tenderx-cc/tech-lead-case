import {
  Container,
  Group,
  Text,
  Title,
  createStyles,
  rem,
} from '@mantine/core';

import { Button } from '../../shared/components/UI/Button/Button';

import { useSetPageTitle } from '../../shared/hooks/useSetPageTitle.hook';

const useStyles = createStyles(theme => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  inner: {
    position: 'relative',
  },

  image: {
    ...theme.fn.cover(),
    opacity: 0.75,
  },

  content: {
    paddingTop: rem(220),
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

// copy pasted from https://ui.mantine.dev/ will be refactored once we have more need for this page
export default function PageNotFound() {
  useSetPageTitle('Page introuvable !');
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Page introuvable !</Title>
          <Text
            variant="lg"
            color="dimmed"
            align="center"
            className={classes.description}
          >
            Oups, il semblerait que vous ayez pris un petit détour vers les
            confins inexplorés de notre site. Ne vous inquiétez pas, même les
            meilleures aventures ont leurs détours imprévus !
          </Text>
          <Group position="center" mb="05">
            <Button component="a" href="/" size="md">
              Revenir en arrière
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
