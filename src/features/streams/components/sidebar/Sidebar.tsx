import { Box, Center, Navbar, ScrollArea, Stack } from '@mantine/core';
import { Group, NavLink, Text } from '@mantine/core';

import { useLocation, useNavigate } from 'react-router-dom';

import type Stream from '../../../../shared/entities/Stream';

type StreamsSidebarProps = {
  width: number;
  streams: Stream[];
};

export default function Sidebar({ streams, width }: StreamsSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar
      w={`${width}px`}
      py="02"
      height="100%"
      sx={theme => ({
        zIndex: 1,
        borderRight: `1px solid ${theme.colors.gray[1]}`,
      })}
    >
      <Stack h="94%" spacing="04">
        <Navbar.Section px="03" py="02">
          <Stack spacing="04">
            <Group noWrap spacing="03">
              <Box
                miw="06"
                mih="06"
                sx={theme => ({
                  borderRadius: theme.radius.md,
                  background:
                    'linear-gradient(180deg, rgba(33, 133, 213, 0.24) 0%, rgba(33, 133, 213, 0.02) 100%)',
                  boxShadow: `${theme.shadows.xs} inset`,
                })}
              >
                <Center pt="01">
                  <Text>👋</Text>
                </Center>
              </Box>
              <Text variant="sm" fw="400" c="gray.7">
                Bonjour, prêt(e) à cueillir les opportunités du jour ?
              </Text>
            </Group>
          </Stack>
        </Navbar.Section>

        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
          <Stack h="400px" spacing="04">
            <Stack spacing="4px">
              {streams.map(stream => (
                <NavLink
                  label={
                    <Text w={180} truncate>
                      {stream.name}
                    </Text>
                  }
                  noWrap
                  active={location.pathname === `/flux/${stream.id}`}
                  onClick={() =>
                    navigate(`/flux/${stream.id}${location.search}`)
                  }
                  fz="14px"
                  fw={
                    location.pathname === `/flux/${stream.id}` ? '600' : '400'
                  }
                  px="sm"
                  py="xxs"
                  styles={theme => ({
                    label: {
                      color: theme.colors.dark[7],
                    },
                    root: {
                      '&[data-active]': {
                        background: theme.colors.primary[1],
                      },
                    },
                  })}
                  sx={theme => ({
                    borderRadius: theme.radius.md,
                  })}
                />
              ))}
            </Stack>
          </Stack>
        </Navbar.Section>
      </Stack>
    </Navbar>
  );
}
