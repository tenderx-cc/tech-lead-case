import { useState } from 'react';

import { Divider, Group, Text, Transition, createStyles } from '@mantine/core';
import type { DividerProps } from '@mantine/core';

import { IconArrowRight, IconChevronDown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { BuyerLogo } from '../../../../shared/components/UI/BuyerLogo/BuyerLogo';
import TenderStatusBadge from '../../../../shared/components/UI/TenderStatusBadge/TenderStatusBadge';

import * as KeyInfoTooltip from '../../../../shared/components/KeyInfoTooltip';
import { CPVRow } from '../../../../shared/components/CPVRow';
import type { DecisionStatus } from '../../../../shared/entities/Interaction';
import { formatDateAsText } from '../../../../shared/utils/dates';
import { concatPostalCode } from '../../../../shared/utils/domain';
import { formatCurrency } from '../../../../shared/utils/format';
import { formatExecutionLocation } from '../../../../shared/utils/location';
import { capitalizeFirstLetter } from '../../../../shared/utils/strings';
import CardCorner from '../../assets/card_corner.svg';
import type { TenderWithTransition } from '../forms/hooks/useSearchTenders.hook';
import { LotsPreview } from './LotsPreview';
import { TenderPreviewCardActionElement } from './PreviewCardActionElement';
import { TenderDataDisplay } from './TenderDataDisplay';
import { getBackgroundFromDecisionStatus } from './utils';

const useStyles = createStyles(theme => ({
  wrapperLink: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    position: 'relative',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[2]}`,
    boxShadow: theme.shadows.sm,
    padding: theme.spacing.xl,
    ':hover': { boxShadow: theme.shadows.lg },
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  tenderHeader: {
    minWidth: 0,
  },
  buyer: {
    display: 'flex',
    gap: theme.spacing.xs,
    alignItems: 'center',
    fontSize: theme.fontSizes.sm,
    whiteSpace: 'nowrap',
    fontWeight: 400,
  },
  buyerName: {
    margin: 0,
    textTransform: 'capitalize',
    color: theme.colors.primary[6],
  },
  postalCode: { color: theme.colors.red[6] },
  tenderTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    color: theme.colors.gray[9],
    marginBottom: theme.spacing.xs,
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textAlign: 'justify',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  actionButtonsWrapper: {
    '& button': {
      maxWidth: '120px',
    },
  },
  arrowWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingTop: '14px',
    paddingLeft: '20px',
    width: '53px',
    height: '41px',
    overflow: 'hidden',
    color: 'initial',
  },
  arrowEffect: {
    backgroundImage: `url(${CardCorner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'scale(1.4) rotate(-20deg) translateX(-4px) translateY(8px)',
    },
  },
  textEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

type TenderPreviewCardProps = {
  tender: TenderWithTransition;
  onTenderDecision: (status: DecisionStatus, reason?: string) => void;
};

export function TenderPreviewCard({
  tender,
  onTenderDecision,
}: TenderPreviewCardProps) {
  const { classes, cx } = useStyles();

  const decisionStatus = tender.interaction?.decisionStatus;

  const tenderTitle = capitalizeFirstLetter(tender.title.toLowerCase());
  const cardBackground = getBackgroundFromDecisionStatus(decisionStatus);

  const [showLotsPreview, setShowLotsPreview] = useState(false);

  return (
    <Transition
      mounted={tender.mounted ?? true}
      transition={tender.transitionStyle || 'fade'}
      exitDuration={450}
      timingFunction="ease"
    >
      {style => (
        <div
          style={{ ...style, background: cardBackground }}
          className={classes.wrapperLink}
        >
          <div className={classes.cardHeader}>
            <div className={classes.tenderHeader}>
              <div className={classes.buyer}>
                <BuyerLogo
                  size="sm"
                  radius="sm"
                  logoURL={tender.buyer.logoURL}
                  buyerId={Number(tender.buyer.id)}
                />

                <p className={cx(classes.buyerName, classes.textEllipsis)}>
                  {concatPostalCode(
                    tender.buyer.originalName.toLowerCase(),
                    tender.buyer.postalCode,
                  )}
                </p>
              </div>

              <Link
                to={`/notices/${tender.id}`}
                className={`${classes.tenderTitle} ${classes.textEllipsis}`}
              >
                {tenderTitle}
              </Link>
            </div>

            <div className={classes.actionButtonsWrapper}>
              <TenderPreviewCardActionElement
                owner={tender.interaction?.owner}
                onTenderDecision={onTenderDecision}
                decisionStatus={tender.interaction?.decisionStatus}
              />
            </div>
          </div>

          <DataRow
            tender={tender}
            setShowLotsPreview={setShowLotsPreview}
            showLotsPreview={showLotsPreview}
          />
          {tender.lots && (
            <LotsPreview lots={tender.lots} show={showLotsPreview} />
          )}
          <CPVRow cpvs={tender.cpvs} />

          <div className={classes.arrowWrapper}>
            <IconArrowRight size={16} stroke={1.5} />
            <div className={`${classes.arrowWrapper} ${classes.arrowEffect}`} />
          </div>
        </div>
      )}
    </Transition>
  );
}

function DataRow({
  tender,
  setShowLotsPreview,
  showLotsPreview,
}: {
  tender: TenderWithTransition;
  setShowLotsPreview: React.Dispatch<React.SetStateAction<boolean>>;
  showLotsPreview: boolean;
}) {
  const publicationDate = formatDateAsText({
    date: tender.publicationDate,
    truncateMonth: false,
  });
  const responseDeadline = tender.responseDeadline
    ? formatDateAsText({ date: tender.responseDeadline, truncateMonth: false })
    : '-';

  const dividerProps: DividerProps = {
    orientation: 'vertical',
    h: '07',
    my: 'auto',
    color: 'gray.2',
  };

  return (
    <Group noWrap spacing="05" sx={{ overflow: 'hidden' }}>
      {/* Dates */}
      <TenderDataDisplay
        statTitle={
          <Group noWrap spacing="02">
            <Text variant="xs" fw="500" c="gray.6">
              Dates
            </Text>
            <TenderStatusBadge status={tender.status} />
          </Group>
        }
        statValue={
          <Group noWrap spacing={4} c="gray.5">
            <Text variant="md" fw={400} c="gray.9">
              {publicationDate}
            </Text>
            <IconArrowRight size={16} />
            <Text variant="md" fw={400} c="gray.9">
              {responseDeadline}
            </Text>
          </Group>
        }
      />
      <Divider {...dividerProps} />

      {/* Amout */}
      <TenderDataDisplay
        statTitle="Montant"
        tooltipContent={<KeyInfoTooltip.Amount />}
        statValue={formatCurrency(tender.estimatedValueInEur) || '-'}
        isLmmEnriched={tender.isEstimatedValueInEurLLMEnriched}
      />
      <Divider {...dividerProps} />

      {/* Duration */}
      <TenderDataDisplay
        statTitle="Durée"
        tooltipContent={<KeyInfoTooltip.Duration />}
        statValue={
          tender.durationInMonth ? tender.durationInMonth + ' mois' : '-'
        }
        isLmmEnriched={tender.isDurationInMonthLLMEnriched}
      />
      <Divider {...dividerProps} />

      {/* Location */}
      <TenderDataDisplay
        statTitle="Lieu d'exc."
        statValue={formatExecutionLocation(tender.executionLocation)}
      />
      <Divider {...dividerProps} />

      {/* Lots */}
      {tender.lots?.length ? (
        <LotsPreviewButton
          count={tender.lots.length}
          setShowLotsPreview={setShowLotsPreview}
          show={showLotsPreview}
        />
      ) : (
        <TenderDataDisplay statTitle="Lots" statValue="Non alloti" />
      )}
    </Group>
  );
}

const useLotsPreviewButtonStyles = createStyles((theme, show: boolean) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: `${theme.spacing['01']} ${theme.spacing['02']}`,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing['02'],
    background: theme.colors.primary[1],
    color: theme.colors.primary[7],
    borderRadius: theme.radius.xl,
    padding: `0 ${theme.spacing['02']}`,
    border: 'none',
    cursor: 'pointer',
  },
  icon: {
    color: theme.colors.primary[7],
    transform: show ? 'rotate(-180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s',
  },
}));

function LotsPreviewButton({
  count,
  setShowLotsPreview,
  show,
}: {
  count: number;
  setShowLotsPreview: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}) {
  const { classes } = useLotsPreviewButtonStyles(show);

  return (
    <div className={classes.container}>
      <Text variant="xs" fw="500" c="gray.6">
        Lots
      </Text>
      <button
        className={classes.button}
        onClick={() => {
          setShowLotsPreview(show => !show);
        }}
      >
        <Text variant="md" fw="500">
          {count}
        </Text>
        <IconChevronDown className={classes.icon} />
      </button>
    </div>
  );
}
