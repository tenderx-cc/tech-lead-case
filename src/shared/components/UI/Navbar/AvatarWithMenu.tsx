import {
  Group,
  MediaQuery,
  Menu,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';

import {  IconLogout } from '@tabler/icons-react';

import { Avatar } from '../Avatar/Avatar';

export default function AvatarWithMenu() {



  return (
    <Menu
      shadow="md"
      width={200}
      withinPortal
      styles={theme => ({
        dropdown: { padding: theme.spacing['02'] + '!important' },
        item: { borderRadius: theme.radius.md },
        itemLabel: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        itemRightSection: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      })}
    >
      <Menu.Target>
        <UnstyledButton>
          <Group noWrap spacing="02" maw={164}>
            <Avatar size="lg" radius="md">
              Jean Dupont
            </Avatar>
            <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
              <Stack spacing={0} w={124}>
                <Text
                  variant="sm"
                  fw={500}
                  c="gray.9"
                  lineClamp={1}
                >Jean Dupont</Text>
              </Stack>
            </MediaQuery>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        

        <Menu.Item
          color="red"
          icon={<IconLogout size={14} />}
          onClick={() => console.log('Déconnexion')}
        >
          Déconnexion
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
