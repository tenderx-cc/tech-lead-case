import { Text, createStyles } from '@mantine/core';

import type Lot from '../../../../shared/entities/Lot';

const useStyles = createStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing['04'],
  },
  lotCard: {
    padding: theme.spacing['04'],
    borderRadius: theme.spacing['02'],
    border: `1px solid ${theme.colors.gray[1]}`,
  },
  lotRow: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: theme.spacing['01'],
    '> span': {
      whiteSpace: 'nowrap',
    },
    color: theme.colors.gray[5],
  },
  lotTitle: {
    fontWeight: 500,
  },
  cpv: {
    color: theme.colors.gray[5],
    fontWeight: 400,
  },
}));

export function LotsPreview({ lots, show }: { lots: Lot[]; show: boolean }) {
  const { classes } = useStyles();

  if (!lots || !show) {
    return null;
  }

  return (
    <div className={classes.container}>
      {lots.sort(sortLotsByReference).map(lot => (
        <LotCard key={lot.title} lot={lot} />
      ))}
    </div>
  );
}

function LotCard({ lot }: { lot: Lot }) {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.lotCard}>
      <Text variant="sm" className={cx(classes.lotRow, classes.lotTitle)}>
        {lot.reference && (
          <>
            <span>Lot {lot.reference}</span>
            <span>&middot;</span>
          </>
        )}
        <Text c="gray.9">{lot.title}</Text>
      </Text>
      <Text variant="xs" className={cx(classes.lotRow, classes.cpv)}>
        {lot.cpvs && lot.cpvs.length > 0 && (
          <>
            <span>CPV</span>
            <span>&middot;</span>
            <Text>{lot.cpvs.map(cpv => cpv.title).join(', ')}</Text>
          </>
        )}
      </Text>
    </div>
  );
}

function sortLotsByReference(a: Lot, b: Lot) {
  if (!a.reference) return -1;
  if (!b.reference) return 1;

  const aParts = a.reference.split(/(\d+)/).map(part => {
    const num = parseInt(part);
    return isNaN(num) ? part : num;
  });

  const bParts = b.reference.split(/(\d+)/).map(part => {
    const num = parseInt(part);
    return isNaN(num) ? part : num;
  });

  for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
    if (aParts[i] === bParts[i]) continue;
    return aParts[i] < bParts[i] ? -1 : 1;
  }
  return aParts.length - bParts.length;
}
