import { type ReactNode } from 'react';

import { Box, Group, Text, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';

import { NavLink, useLocation } from 'react-router-dom';

export type NavbarLinkProps = {
  link: string;
  label: string;
  icon: ReactNode;
};

export default function NavbarLink({
  link,
  ...rest
}: NavbarLinkProps) {
  const location = useLocation();
  const isSubpage =
    location.pathname.startsWith(link) && location.pathname !== link;

  return (
    <NavLink
      to={link}
      style={({ isActive }) => {
        return {
          textDecoration: 'none',
          pointerEvents: isActive && !isSubpage ? 'none' : 'all',
        };
      }}
    >
      {({ isActive }) =>
        <NavBarButton isActive={isActive} {...rest} />
      }
    </NavLink>
  );
}

type NavBarButtonProps = {
  icon: ReactNode;
  label: string;
  isActive: boolean;
};

const NavBarButton = ({ icon, label, isActive }: NavBarButtonProps) => {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const backgroundColors = {
    active: theme.colors.primary[1],
    hovered: theme.colors.gray[0],
    default: 'transparent',
  };

  const textColor = {
    active: 'primary.7',
    hovered: 'gray.9',
    default: 'gray.8',
  };
  return (
    <Group
      h="36px"
      ref={ref}
      spacing="02"
      px="02"
      py={0}
      sx={theme => ({
        backgroundColor: isActive
          ? backgroundColors.active
          : hovered
            ? backgroundColors.hovered
            : backgroundColors.default,
        borderRadius: theme.radius.md,
      })}
      noWrap
    >
      <Box
        w="24px"
        h="24px"
        pl="4px"
        pt="2px"
        sx={theme => ({
          color: isActive ? 'white' : theme.colors.gray[6],
          background: isActive ? theme.other.gradients.primary : 'transparent',
          borderRadius: '100%',
        })}
      >
        {icon}
      </Box>
      <Text
        variant="sm"
        fw={isActive ? 500 : 400}
        color={
          isActive
            ? textColor.active
            : hovered
              ? textColor.hovered
              : textColor.default
        }
        sx={{ whiteSpace: 'nowrap' }}
      >
        {label}
      </Text>
    </Group>
  );
};
