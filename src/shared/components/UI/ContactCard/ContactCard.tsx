import { forwardRef } from 'react';

import type { StackProps } from '@mantine/core';
import {
  ActionIcon,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';

import { IconAt, IconExternalLink, IconPhone } from '@tabler/icons-react';

import BackgroundLogo from '../../../assets/UI/background_logo.svg';

import type { Location } from '../../../entities/Location';
import { goToGmap } from '../../../utils/navigation';
import { Tooltip } from '../Tooltip/Tooltip';

export type ContactCardProps = {
  name: string;
  email: string;
  title?: string;
  phone?: string;
  location?: Location;
} & StackProps;

export const ContactCard = forwardRef(
  (
    { name, title, email, phone, location, ...stackProps }: ContactCardProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <Stack
        h="fit-content"
        w="fit-content"
        p="04"
        spacing="03"
        ref={ref}
        {...stackProps}
        sx={theme => ({
          position: 'relative',
          background: `url(${BackgroundLogo}) no-repeat right bottom`,
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colors.gray[1]}`,
          boxShadow: theme.shadows.xs,
        })}
      >
        <NameSection {...{ name, title }} />
        <ContactSection {...{ email, phone }} />
        {location && <AddressSection {...{ location }} />}
      </Stack>
    );
  },
);

type NameSectionProps = {
  name?: string;
  title?: string;
};

const NameSection = ({ name, title }: NameSectionProps) => {
  if (!title && !name) {
    return;
  }

  return (
    <Stack spacing={0} miw="278px">
      <Text variant="md" fw="500" c="gray.9">
        {name}
      </Text>
      <Text variant="sm" fw="400" c="gray.6">
        {title}
      </Text>
      <Divider color="gray.1" mt="02" />
    </Stack>
  );
};

type ContactSectionProps = {
  email?: string;
  phone?: string;
};

const ContactSection = ({ email, phone }: ContactSectionProps) => {
  return (
    <Stack spacing="02" miw="278px">
      <ContactGroup text={email} icon={<IconAt />} />
      <ContactGroup text={phone} icon={<IconPhone />} />
    </Stack>
  );
};

type ContactGroupProps = {
  text?: string;
  icon: React.ReactNode;
};

const ContactGroup = ({ text, icon }: ContactGroupProps) => {
  if (!text) {
    return null;
  }
  return (
    <Group noWrap spacing="02">
      <ThemeIcon size="sm" c="gray.4" bg="transparent">
        {icon}
      </ThemeIcon>
      <Text variant="sm" fw="500" c="primary.6">
        {text}
      </Text>
    </Group>
  );
};

type AddressSectionProps = {
  location: Location;
};

const AddressSection = ({ location }: AddressSectionProps) => {
  const { address, postalCode, city } = location;

  return (
    <Group noWrap w="80%">
      <Stack spacing={0}>
        {address && (
          <Text variant="sm" fw={400} color="gray.6">
            {`${address},`}
          </Text>
        )}
        <Text variant="sm" fw={400} color="gray.6">
          {`${postalCode || ''} ${city}`}
        </Text>
      </Stack>

      <Tooltip content={'Ouvrir Google Maps'}>
        <ActionIcon
          size="xs"
          color="primary"
          onClick={() => goToGmap(location)}
        >
          <IconExternalLink />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
