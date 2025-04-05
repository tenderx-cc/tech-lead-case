import { Box, Image, Stack, Text, Title } from '@mantine/core';

import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../shared/components/UI/Button/Button';

import EmptyResultList from '../../assets/empty_results.svg';
import RocketAnimation from '../../assets/rocket_animation.webm';

export const EmptyStreamList = () => {
  const navigate = useNavigate();
  const title = 'Bravo, revenez demain !';

  return (
    <Box
      h="100%"
      m="05"
      bg="linear-gradient(180deg, #F7FBFF 34%, rgba(247, 251, 255, 0) 100%)"
      sx={theme => ({ borderRadius: theme.radius.md })}
    >
      <Stack align="center" spacing="05" m="10%">
        <Box w="116px" h="116px" pos="relative">
          <Image
            pos="absolute"
            top={0}
            left={0}
            src={EmptyResultList}
            alt="Illustration de liste d'appels d'offre vide"
            w="116px"
            maw="116px"
            mah="116px"
          />
          <VideoPlayer src={RocketAnimation} />
        </Box>
        <Stack spacing="02" align="center" maw="60%">
          <Title align="center" order={4} c="gray.9" maw="480px">
            {title}
          </Title>
          <Text variant="sm" fw={400} c="gray.6" align="center" maw="80%">
            Vous avez évalué toutes les opportunités disponibles pour le moment.
            Retrouvez les dans l'onglet Pipeline.
          </Text>
        </Stack>
        <Button
          size="lg"
          rightIcon={<IconArrowRight />}
          onClick={() => navigate('/pipeline')}
        >
          Analyser mon Pipeline
        </Button>
      </Stack>
    </Box>
  );
};

type VideoPlayerProps = {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
};

const VideoPlayer = ({
  src,
  autoPlay = true,
  controls = false,
  loop = false,
}: VideoPlayerProps) => {
  return (
    <video
      src={src}
      autoPlay={autoPlay}
      controls={controls}
      style={{
        width: '126px',
        position: 'absolute',
        top: -12,
        left: -6,
        zIndex: 1,
      }}
      loop={loop}
    />
  );
};
