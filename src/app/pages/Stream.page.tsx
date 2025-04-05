import { useEffect, useState } from 'react';

import { Box, Group } from '@mantine/core';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { NAVBAR_HEIGHT } from '../../shared/components/UI/Navbar/Navbar';

import { ListOfResults } from '../../features/streams/components/listOfResults/ListOfResults';
import Sidebar from '../../features/streams/components/sidebar/Sidebar';
import type Stream from '../../shared/entities/Stream';

const SIDEBAR_WIDTH = 284;

type StreamListOfResultsPageParams = {
  id: string;
};

const streams = [
  {
    id: 1,
    name: 'Formation Paris',
    filterSettings: {
      status: ['OPEN'],
    },
    streamSectionId: 1,
    pendingDecisionCount: 10,
  },
  {
    id: 2,
    name: 'AO Formation cloturés',
    filterSettings: {
      status: ['CLOSED'],
    },
    streamSectionId: 1,
    pendingDecisionCount: 5,
  },
  {
    id: 3,
    name: 'Formation Lyon',
    filterSettings: {
      status: ['OPEN'],
    },
    streamSectionId: 2,
    pendingDecisionCount: 0,
  },
];

export default function StreamPage() {
  const { id } = useParams<StreamListOfResultsPageParams>();
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('location.pathname', location.pathname);
    if (location.pathname === `/flux`) {
      navigate(`/flux/${streams[0].id}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const stream = streams.find(stream => stream.id === Number(id));
    if (stream) {
      setSelectedStream(stream);
    } else {
      setSelectedStream(null);
    }
  }, [id]);

  return (
    <Group
      h="100%"
      mah={`calc(100vh - ${NAVBAR_HEIGHT}px)`}
      sx={{ overflow: 'hidden' }}
    >
      <Sidebar width={SIDEBAR_WIDTH} streams={streams} />
      <Box
        h="100%"
        w={`calc(100% - ${SIDEBAR_WIDTH}px)`}
        ml={`${SIDEBAR_WIDTH}px`}
      >
        <ListOfResults stream={selectedStream} />
      </Box>
    </Group>
  );
}
