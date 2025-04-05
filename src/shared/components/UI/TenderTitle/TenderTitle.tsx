import type { ReactElement } from 'react';
import { useRef } from 'react';

import { Box, Group, Stack, Text, Title } from '@mantine/core';

import { IconExternalLink } from '@tabler/icons-react';

import { concatPostalCode } from '../../../utils/domain';
import { capitalizeFirstLetter } from '../../../utils/strings';
import { BuyerLogo } from '../BuyerLogo/BuyerLogo';
import { Tooltip } from '../Tooltip/Tooltip';

type SizeParam = 'xs' | 'sm' | 'md' | 'lg';

export type TenderTitleProps = {
  buyerOriginalName: string;
  logoURL?: string;
  buyerId?: number;
  tenderTitle: string;
  buyerPostalCode?: string;
  withTooltip?: boolean;
  withExternalLinkIcon?: boolean;
  size?: SizeParam;
};

export const TenderTitle = ({
  buyerOriginalName,
  logoURL,
  tenderTitle,
  buyerPostalCode,
  buyerId,
  withTooltip = false,
  withExternalLinkIcon = false,
  size = 'md',
}: TenderTitleProps) => {
  const titleRef = useRef<HTMLDivElement>(null);

  const buyerPageLinkProps = buyerId
    ? {
        w: 'fit-content',
        onMouseDown: (e: React.MouseEvent<HTMLDivElement>) =>
          e.preventDefault(),
        onClick: (e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
        },
        sx: {
          borderBottom: `1px solid transparent`,
          ':hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
          },
        },
      }
    : {};

  const sizeConfig = sizeConfigs(
    capitalizeFirstLetter(tenderTitle.toLowerCase()),
    titleRef,
  )[size];

  return (
    <Tooltip content={tenderTitle} isVisibile={withTooltip} width={620}>
      <Stack spacing={sizeConfig.verticalSpacing} w="100%">
        <Group noWrap spacing="02">
          <Group
            noWrap
            spacing="02"
            c={sizeConfig.buyerColor}
            {...buyerPageLinkProps}
          >
            <BuyerLogo
              size={sizeConfig.buyerLogo.size}
              radius={sizeConfig.buyerLogo.radius}
              logoURL={logoURL}
              buyerId={buyerId}
            />
            <Text
              truncate
              variant="sm"
              fw={sizeConfig.buyerWeight}
              lineClamp={1}
              tt="capitalize"
            >
              {concatPostalCode(
                buyerOriginalName.toLowerCase(),
                buyerPostalCode,
              )}
            </Text>
            <Box>
              {buyerId && withExternalLinkIcon && (
                <IconExternalLink size={16} style={{ marginTop: '-2px' }} />
              )}
            </Box>
          </Group>
          {size === 'xs' && sizeConfig.titleElement}
        </Group>

        {size !== 'xs' && sizeConfig.titleElement}
      </Stack>
    </Tooltip>
  );
};

type SizeConfig = {
  avatarBorderRadius: 'xs' | 'sm';
  buyerColor: 'primary.6' | 'primary.7';
  buyerWeight: 400 | 500;
  buyerLogo: {
    radius: 'xs' | 'sm';
    size: SizeParam;
  };
  titleElement: ReactElement;
  verticalSpacing: 0 | '0' | '02';
};

type SizeConfigs = Record<SizeParam, SizeConfig>;

const sizeConfigs = (
  title: string,
  ref: React.RefObject<HTMLDivElement>,
): SizeConfigs => ({
  xs: {
    avatarBorderRadius: 'xs',
    buyerColor: 'primary.6',
    buyerWeight: 500,
    buyerLogo: {
      radius: 'xs',
      size: 'sm',
    },
    verticalSpacing: 0,
    titleElement: (
      <Text ref={ref} variant="sm" fw="400" c="gray.5" lineClamp={1}>
        {title}
      </Text>
    ),
  },
  sm: {
    avatarBorderRadius: 'xs',
    buyerColor: 'primary.6',
    buyerWeight: 400,
    buyerLogo: {
      radius: 'sm',
      size: 'sm',
    },
    verticalSpacing: 0,
    titleElement: (
      <Text ref={ref} variant="sm" fw="500" c="gray.9" truncate>
        {title}
      </Text>
    ),
  },
  md: {
    avatarBorderRadius: 'xs',
    buyerColor: 'primary.6',
    buyerWeight: 400,
    buyerLogo: {
      radius: 'sm',
      size: 'sm',
    },
    verticalSpacing: '0',
    titleElement: (
      <Title ref={ref} order={5} c="gray.9" lineClamp={3}>
        {title}
      </Title>
    ),
  },
  lg: {
    avatarBorderRadius: 'sm',
    buyerColor: 'primary.6',
    buyerWeight: 500,
    buyerLogo: {
      radius: 'xs',
      size: 'md',
    },
    verticalSpacing: '02',
    titleElement: (
      <Title ref={ref} order={3} c="gray.9" lineClamp={3}>
        {title}
      </Title>
    ),
  },
});
