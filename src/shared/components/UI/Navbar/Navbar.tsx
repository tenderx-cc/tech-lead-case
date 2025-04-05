import { Group, Header } from '@mantine/core';

import {
  IconArrowsShuffle,
  IconBallpen,
  IconLayoutKanban,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { LogoWithText } from '../Logo/LogoWithText';
import AvatarWithMenu from './AvatarWithMenu';
import type { NavbarLinkProps } from './NavbarLink';
import NavbarLink from './NavbarLink';

export const NAVBAR_HEIGHT = 60;

const LINKS: NavbarLinkProps[] = [
  {
    link: `/flux`,
    label: "Flux d'opportunités",
    icon: <IconArrowsShuffle size={16} />,
  },
  {
    link: '/pipeline',
    label: 'Pipeline',
    icon: <IconLayoutKanban size={16} />,
  },
  {
    link: '/response',
    label: 'Aide à la réponse',
    icon: <IconBallpen size={16} />,
  },
];

export function Navbar() {

  return (
    <Header
      height={NAVBAR_HEIGHT}
      px="04"
      sx={theme => ({
        borderBottom: `1px solid ${theme.fn.rgba(theme.colors.gray[9], 0.08)}`,
        boxShadow: `${theme.shadows.xs}`,
      })}
    >
      <Group noWrap w="100%" h="100%" spacing="04">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <LogoWithText />
        </Link>
        <Group noWrap position="apart" w="100%">
          <Group noWrap spacing="03">
            {LINKS.map(link => (
              <NavbarLink key={link.link} {...link} />
            ))}
          </Group>
          <Group noWrap px="02">
            <AvatarWithMenu />
          </Group>
        </Group>
      </Group>
    </Header>
  );
}
