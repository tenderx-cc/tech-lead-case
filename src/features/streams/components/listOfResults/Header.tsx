/// <reference types="vite-plugin-svgr/client" />
import { Group, Title } from '@mantine/core';

import { IconPencil } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../shared/components/UI/Button/Button';

export const STREAM_LIST_OF_RESULTS_HEADER_HEIGHT = 68;

type HeaderProps = {
  streamId?: number;
  streamTitle?: string;
};

export const Header = ({ streamId, streamTitle }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <Group
      position="apart"
      p="05"
      pb="02"
      sx={{
        background: 'linear-gradient(180deg, #EFF8FF -12.4%, #FFFFFF 65.97%)',
      }}
    >
      <Title order={3} c="gray.9">
        {streamTitle}
      </Title>
      <Group spacing="03" ta="end">
        <Button
          variant="default"
          leftIcon={<IconPencil />}
          onClick={() => {
            navigate(`/flux/${streamId}/edit`);
          }}
        >
          Éditer le flux
        </Button>
      </Group>
    </Group>
  );
};
