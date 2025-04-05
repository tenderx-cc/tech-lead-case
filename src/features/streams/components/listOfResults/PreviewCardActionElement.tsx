import { useState } from 'react';

import { Group, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import {
  IconArrowBackUp,
  IconArrowRight,
  IconCheck,
  IconTrophy,
  IconTrophyOff,
  IconX,
} from '@tabler/icons-react';

import { Button } from '../../../../shared/components/UI/Button/Button';
import { ButtonWithDropdown } from '../../../../shared/components/UI/ButtonWithDropdown/ButtonWithDropdown';
import { UserWithAvatar } from '../../../../shared/components/UI/UserWithAvatar/UserWithAvatar';

import { DecisionStatus } from '../../../../shared/entities/Interaction';
import type { User } from '../../../../shared/entities/User';

type TenderPreviewCardActionElementProps = {
  onTenderDecision: (status: DecisionStatus, reason?: string) => void;
  decisionStatus?: DecisionStatus;
  owner?: User;
};

export function TenderPreviewCardActionElement({
  decisionStatus,
  onTenderDecision,
  owner,
}: TenderPreviewCardActionElementProps) {
  if (!decisionStatus || decisionStatus === DecisionStatus.PENDING) {
    return <DecisionButtons onTenderDecision={onTenderDecision} />;
  }

  return (
    <Stack spacing="02" align="flex-end">
      <DecisionUpdateButton
        decisionStatus={decisionStatus}
        onTenderDecision={onTenderDecision}
      />
      {owner && (
        <UserWithAvatar
          firstName={owner.firstName}
          lastName={`${owner.lastName[0]}.`}
          avatarColor={owner.avatarColor}
          isDisabled={!!owner.disabledAt}
          w="fit-content"
        />
      )}
    </Stack>
  );
}

type DecisionButtonsProp = {
  onTenderDecision: (status: DecisionStatus) => void;
};

const DecisionButtons = ({ onTenderDecision }: DecisionButtonsProp) => {
  const isSmallScreen = useMediaQuery('(max-width: 1250px)');
  const [isClicked, setIsClicked] = useState(false);

  const handleDecision = async (status: DecisionStatus) => {
    // Prevent multiple clicks
    if (isClicked) {
      return;
    }
    setIsClicked(true);
    onTenderDecision(status);
  };

  return (
    <Group
      noWrap={!isSmallScreen}
      spacing="02"
      position="right"
      align="flex-start"
    >
      <Button
        variant="light"
        color="red"
        size="sm"
        w="100%"
        leftIcon={<IconX />}
        onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          e.stopPropagation();
          handleDecision(DecisionStatus.REJECTED);
        }}
      >
        Rejeter
      </Button>

      <Button
        variant="light"
        color="primary"
        size="sm"
        w="100%"
        leftIcon={<IconCheck />}
        onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          e.stopPropagation();
          handleDecision(DecisionStatus.TO_ANALYZE);
        }}
      >
        À analyser
      </Button>
    </Group>
  );
};

type DecisionUpdateButtonProps = {
  decisionStatus: Exclude<DecisionStatus, DecisionStatus.PENDING>;
  onTenderDecision: (status: DecisionStatus, nogoReason?: string) => void;
};

const DecisionUpdateButton = ({
  decisionStatus,
  onTenderDecision: upsertDecision,
}: DecisionUpdateButtonProps) => {
  const updateButtonConfig = updateButtonConfigs[decisionStatus];
  const [isOpen, setOpen] = useState(false);

  const handleDecisionUpdate = (newDecisionStatus: DecisionStatus) => {
    upsertDecision(newDecisionStatus);
  };

  const dropDownItemsProps = updateButtonConfig.updateOptions?.map(
    (status: DecisionStatus) => {
      const config = updateButtonConfigs[status];
      return {
        label: config.text,
        icon: config.icon,
        onClick: () => handleDecisionUpdate(status),
      };
    },
  );

  return (
    <ButtonWithDropdown
      opened={isOpen}
      onOpenChange={openned => setOpen(openned)}
      items={dropDownItemsProps}
      label={updateButtonConfig.text}
      buttonProps={{ color: updateButtonConfig.color }}
      drowdownLabel="Changer la décision"
    />
  );
};

type UpdateButtonConfig = {
  color?: 'primary' | 'red';
  icon: React.ReactNode;
  text: string;
  updateOptions?: DecisionStatus[];
};

type UpdateButtonConfigs = Record<DecisionStatus, UpdateButtonConfig>;

const updateButtonConfigs: UpdateButtonConfigs = {
  [DecisionStatus.PENDING]: {
    icon: <IconArrowBackUp size={16} />,
    text: 'Annuler la décision',
  },
  [DecisionStatus.REJECTED]: {
    color: 'red',
    icon: <IconX size={16} />,
    text: 'Rejeté',
    updateOptions: [DecisionStatus.TO_ANALYZE, DecisionStatus.PENDING],
  },
  [DecisionStatus.TO_ANALYZE]: {
    color: 'primary',
    icon: <IconCheck size={16} />,
    text: 'À analyser',
    updateOptions: [DecisionStatus.REJECTED, DecisionStatus.PENDING],
  },
  [DecisionStatus.GO]: {
    color: 'primary',
    icon: <IconCheck size={16} />,
    text: 'Go',
    updateOptions: [DecisionStatus.NOGO, DecisionStatus.TO_ANALYZE],
  },
  [DecisionStatus.NOGO]: {
    color: 'red',
    icon: <IconX size={16} />,
    text: 'No go',
    updateOptions: [DecisionStatus.GO, DecisionStatus.TO_ANALYZE],
  },
  [DecisionStatus.ANSWERED]: {
    color: 'primary',
    icon: <IconArrowRight size={16} />,
    text: 'Répondu',
    updateOptions: [DecisionStatus.GO],
  },
  [DecisionStatus.WIN]: {
    color: 'primary',
    icon: <IconTrophy size={16} />,
    text: 'Gagné',
    updateOptions: [DecisionStatus.LOSS, DecisionStatus.GO],
  },
  [DecisionStatus.LOSS]: {
    color: 'red',
    icon: <IconTrophyOff size={16} />,
    text: 'Perdu',
    updateOptions: [DecisionStatus.WIN, DecisionStatus.GO],
  },
};
