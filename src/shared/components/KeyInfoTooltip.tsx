import { useMantineTheme } from '@mantine/core';

export function Amount() {
  const bulletPoints = [
    "Représente le montant estimé total du marché s'il y a plusieurs montants mentionnés.",
    'Correspond à la somme des montants des lots le cas échéant.',
    'Correspond au montant total dans le cas où le montant est découpé en plusieurs tranches.',
  ];

  return <KeyInfoTooltip bulletPoints={bulletPoints} />;
}

export function Duration() {
  const bulletPoints = [
    "Représente la somme de la période initiale et de toutes les périodes de reconduction ou renouvellement quand cela s'y prête",
    'Correspond à la durée maximale autorisée si plusieurs facteurs de durées sont exprimés.',
  ];

  return <KeyInfoTooltip bulletPoints={bulletPoints} />;
}

function KeyInfoTooltip({ bulletPoints }: { bulletPoints: string[] }) {
  const theme = useMantineTheme();

  return (
    <ul
      style={{
        paddingLeft: theme.spacing['02'],
        margin: theme.spacing['02'],
        fontSize: theme.fontSizes.xs,
      }}
    >
      {bulletPoints.map(content => (
        <li key={content}>{content}</li>
      ))}
    </ul>
  );
}
