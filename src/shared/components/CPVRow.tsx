import { forwardRef } from 'react';

import { Divider, Group, Stack, Text } from '@mantine/core';

import { Tooltip } from './UI/Tooltip/Tooltip';

import type { Cpv } from '../entities/Cpv';

type CPVRowProps = {
  cpvs: Cpv[] | undefined;
};

export const CPVRow = ({ cpvs }: CPVRowProps) => {
  if (!cpvs?.length) {
    return;
  }

  return (
    <Tooltip
      content={<CPVTooltipContent cpvs={cpvs} />}
      position="bottom-start"
      dropDownProps={{
        bg: 'white',
        p: '02',
      }}
    >
      <Group maw="80%">
        <Text variant="xs" fw="400" c="gray.6" lineClamp={1}>
          {`CPV ·` + cpvs?.map(cpv => ` ${cpv.title}`).join(', ')}
        </Text>
      </Group>
    </Tooltip>
  );
};

const CPVTooltipContent = forwardRef<HTMLDivElement, CPVRowProps>(
  ({ cpvs }, ref) => {
    return (
      <Stack
        ref={ref}
        spacing="00"
        p="01"
        m={0}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <Text px="02" py="01" c="gray.6" variant="xs" fw={400}>
          CPV associés
        </Text>
        {cpvs?.map((cpv: Cpv, index: number) => {
          return (
            <Stack
              key={cpv.code}
              spacing="00"
              sx={theme => ({
                borderRadius: theme.radius.sm,
              })}
            >
              {index !== 0 && <Divider py="00" color="gray.1" />}
              <Text variant="sm" fw={500} c="gray.9" px="02">
                {cpv.title}
              </Text>
              <Text variant="xs" fw={400} c="gray.6" px="02">
                {cpv.code}
              </Text>
            </Stack>
          );
        })}
      </Stack>
    );
  },
);
