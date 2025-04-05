/// <reference types="vite-plugin-svgr/client" />
import type { ReactNode } from 'react';

import type { MantineTheme } from '@mantine/core';
import { Group, Stack, Text, useMantineTheme } from '@mantine/core';

import { Tooltip } from '../../../../shared/components/UI/Tooltip/Tooltip';

import AIIconSparkle from '../../../../shared/assets/ai_icons/sparkle.svg?react';

type TenderDataDisplayVariant = 'default' | 'outlined';
type TenderDataDisplayProps = {
  statTitle: string | ReactNode;
  statValue: string | number | ReactNode;
  isLmmEnriched?: boolean;
  variant?: TenderDataDisplayVariant;
  tooltipContent?: ReactNode;
};

export const TenderDataDisplay = ({
  statTitle,
  statValue,
  isLmmEnriched = false,
  variant = 'default',
  tooltipContent,
}: TenderDataDisplayProps) => {
  const theme = useMantineTheme();
  const variantConfig = getTenderDataDisplayVariantConfig(theme)[variant];

  return (
    <Stack
      spacing="0"
      {...variantConfig.padding}
      sx={{
        borderRadius: variantConfig.borderRadius,
        background: variantConfig.background,
        border: variantConfig.border,
        boxShadow: variantConfig.shadow,
      }}
    >
      <RenderStatTitle statTitle={statTitle} />
      {isLmmEnriched ? (
        <RenderLlmData tooltipContent={tooltipContent}>
          {statValue}
        </RenderLlmData>
      ) : (
        <Text variant="md" fw="400" c="gray.9" sx={{ whiteSpace: 'nowrap' }}>
          {statValue}
        </Text>
      )}
    </Stack>
  );
};

type RenderStatTitleProps = {
  statTitle: string | ReactNode;
};

const RenderStatTitle = ({ statTitle }: RenderStatTitleProps) => {
  if (typeof statTitle === 'string') {
    return (
      <Text
        variant="xs"
        fw="500"
        c="gray.6"
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {statTitle}
      </Text>
    );
  }
  return statTitle;
};

const RenderLlmData = ({
  children,
  tooltipContent,
}: {
  children: string | number | ReactNode;
  tooltipContent?: ReactNode;
}) => {
  return (
    <Tooltip
      width={280}
      position="bottom-start"
      offset={16}
      shadow="md"
      dropDownProps={{
        c: 'white',
        bg: 'violet.6',
        sx: theme => ({
          borderRadius: theme.radius.md,
          transform: `translateX(-${theme.spacing['03']})`,
        }),
      }}
      content={
        tooltipContent ??
        "Donnée extraite des documents grâce à l'intelligence artificielle."
      }
    >
      <Group noWrap spacing="01">
        <Text
          variant="md"
          fw={400}
          sx={theme => ({
            background: theme.other.gradients.aiHorizontal,
            backgroundClip: 'text',
            color: 'transparent',
            whiteSpace: 'nowrap',
          })}
        >
          {children}
        </Text>
        <AIIconSparkle style={{ width: '30px' }} />
      </Group>
    </Tooltip>
  );
};

type TenderDataDisplayVariantConfig = {
  borderRadius: string;
  background: string;
  border: string;
  shadow?: string;
  padding: {
    pl: string;
    pr: string;
    py: string;
  };
};

const getTenderDataDisplayVariantConfig = (
  theme: MantineTheme,
): Record<TenderDataDisplayVariant, TenderDataDisplayVariantConfig> => ({
  default: {
    borderRadius: 'md',
    background: 'gray.1',
    border: 'none',
    padding: {
      pl: '02',
      pr: '02',
      py: '01',
    },
  },
  outlined: {
    borderRadius: theme.radius.md,
    background: 'white',
    border: `1px solid ${theme.colors.gray[1]}`,
    shadow: theme.shadows.xs,
    padding: {
      pl: '03',
      pr: '04',
      py: '02',
    },
  },
});
