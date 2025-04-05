import { notifications } from '@mantine/notifications';

import {
  IconCheck,
  IconExclamationMark,
  IconFileReport,
  IconX,
} from '@tabler/icons-react';

import { DecisionStatus } from '../../entities/Interaction';
import { RagBlockingReason, type RagGenerability } from '../../entities/Tender';

export const displayDecisionNotification = (
  status: DecisionStatus,
  ragGenerability?: RagGenerability,
) => {
  switch (status) {
    case DecisionStatus.TO_ANALYZE:
      displayToAnalyzeNotification(ragGenerability);
      break;
    case DecisionStatus.REJECTED:
      notifications.show({
        title: 'Opportunité rejetée',
        message: 'Ajoutée aux Opportunités rejetées.',
        radius: 'md',
        autoClose: 2000,
        withBorder: true,
        color: 'red.6',
        icon: <IconX size="18" />,
      });
      break;
    case DecisionStatus.NOGO:
    case DecisionStatus.GO:
    case DecisionStatus.ANSWERED:
    case DecisionStatus.WIN:
    case DecisionStatus.LOSS:
      throw new Error(
        `Decision status ${status} is not supported for notifications`,
      );
  }
};

function displayToAnalyzeNotification(ragGenerability?: RagGenerability) {
  if (!ragGenerability) {
    throw new Error('RAG generability data is missing');
  }

  if (ragGenerability.isGeneratable) {
    notifications.show({
      title: 'Fiche de synthèse',
      message:
        'Notre IA est en train de remplir la fiche de synthèse automatiquement.',
      radius: 'md',
      autoClose: 2000,
      withBorder: true,
      color: 'primary.6',
      icon: <IconCheck size="18" />,
    });
  } else if (ragGenerability.error === RagBlockingReason.NO_DOCUMENTS) {
    notifications.show({
      title: 'Demande de documents effectuée',
      message:
        'Les documents seront automatiquement ajoutés dans quelques jours.',
      radius: 'md',
      autoClose: 2000,
      withBorder: true,
      color: 'primary.6',
      icon: <IconFileReport size="18" />,
    });
  } else if (
    ragGenerability.error === RagBlockingReason.NO_SUPPORTED_DOCUMENTS
  ) {
    notifications.show({
      title: 'Documents non supportés',
      message:
        'Les documents de cette opportunité ne sont pas supportés par Tengo.',
      radius: 'md',
      autoClose: 2000,
      withBorder: true,
      color: 'primary.6',
      icon: <IconExclamationMark size="18" />,
    });
  }
}
