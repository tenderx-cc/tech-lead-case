import type { ReactNode } from 'react';

import { Center, Stack, Text, Title } from '@mantine/core';

import { IconBroadcast } from '@tabler/icons-react';

type EmptyPlaceholderProps = {
  title: string;
  subtitle?: string;
  actionsComponent?: ReactNode;
};
export function EmptyPlaceholder({
  title,
  subtitle,
  actionsComponent,
}: EmptyPlaceholderProps) {
  return (
    <Center>
      <Stack m="2%" spacing="03" w={550} align="center" justify="center">
        <>
          <svg height="0" width="0">
            <defs>
              <filter
                id="outer-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation="1"
                  result="blur"
                />
                <feOffset in="blur" dx="1.31" dy="2.62" result="offsetBlur" />
                {/* Adjust for glow offset */}
                <feFlood floodColor="rgba(255, 255, 255, 0.8)" result="color" />
                {/* Adjust color and opacity */}
                <feComposite
                  in="color"
                  in2="offsetBlur"
                  operator="in"
                  result="colorBlur"
                />
                <feMerge>
                  <feMergeNode in="colorBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="inner-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feComponentTransfer in="SourceAlpha">
                  <feFuncA type="table" tableValues="1 0" />
                </feComponentTransfer>
                <feGaussianBlur stdDeviation="2" />
                <feOffset dx="0" dy="3" result="offsetblur" />
                <feFlood floodColor="rgba(0, 0, 0, 0.3)" result="color" />
                <feComposite in2="offsetblur" operator="in" />
                <feComposite in2="SourceAlpha" operator="in" />
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode />
                </feMerge>
              </filter>
            </defs>
          </svg>
          <IconBroadcast
            size={134}
            stroke={1.2}
            color="#E1E8EC"
            style={{ filter: 'url(#inner-shadow)' }}
          />
        </>
        <Stack spacing={8} align="center">
          <Title order={3}>{title}</Title>
          {subtitle && (
            <Text variant="md" c="gray.6" maw={380} align="center">
              {subtitle}
            </Text>
          )}
        </Stack>
        {actionsComponent}
      </Stack>
    </Center>
  );
}
