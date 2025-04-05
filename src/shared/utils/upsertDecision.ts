import { upsertInteractionWithDecisionStatus } from '../api/magellan/interaction';
import { DecisionStatus } from '../entities/Interaction';

export type StatusType = {
  type: 'DecisionStatus';
  value: DecisionStatus;
};

export function upsertDecision({
  tenderId,
  status,
  streamId,
}: {
  tenderId: number;
  status: StatusType;
  reason?: string;
  streamId?: number;
  winningAmount?: number;
}) {
  if (status.type !== 'DecisionStatus') {
    throw new Error('Invalid status type');
  }

  switch (status.value) {
    case DecisionStatus.NOGO:
    case DecisionStatus.LOSS:
    case DecisionStatus.WIN:
      throw new Error('Unhandled cases');

    default:
      return upsertInteractionWithDecisionStatus(
        tenderId,
        status.value,
        streamId,
      );
  }
}
