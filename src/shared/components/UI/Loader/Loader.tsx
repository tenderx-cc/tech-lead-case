import type { LoaderProps } from '@mantine/core';
import {
  Center,
  Loader as MantineLoader,
  Stack,
  Text,
  Title,
} from '@mantine/core';

type CustomLoader = {
  title?: string;
  subtitle?: string;
  mt?: number | string;
  loaderProps?: LoaderProps;
};

export function Loader({ title, subtitle, mt, loaderProps }: CustomLoader) {
  const size = loaderProps?.size || 'xl';

  return (
    <Center h="100%" mt={mt}>
      <Stack>
        <MantineLoader size={size} m="auto" {...loaderProps} />
        {title && (
          <Title order={3} align="center">
            {title}
          </Title>
        )}
        {subtitle && (
          <Text variant="md" c="gray.9" align="center" maw="480px">
            {subtitle}
          </Text>
        )}
      </Stack>
    </Center>
  );
}
