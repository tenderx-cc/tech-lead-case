export function formatCurrency(value?: number) {
  if (!value) {
    return null;
  }

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
  if (value >= 1000000) {
    return formatter.format(value / 1000000) + 'M€';
  } else if (value >= 1000) {
    return formatter.format(value / 1000) + 'k€';
  } else {
    return formatter.format(value) + '€';
  }
}

export function formatDurationValue(
  durationInMonth: number | undefined | null,
) {
  if (!durationInMonth) {
    return null;
  }

  return `${durationInMonth} mois`;
}
