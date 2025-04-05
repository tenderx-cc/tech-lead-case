import type { User } from './User';

export type Interaction = {
  decisionStatus?: DecisionStatus;
  owner?: User;
  note?: string;
  nogoReason?: string;
  resultReason?: string;
  answeredAt?: Date;
  winningAmount?: number;
  isSubscribedToTenderUpdateOnBuyerProfile: boolean;
  userUpdatedResponseDeadline?: string;
  summarySheetShareUuid?: string | null;
};

export enum DecisionStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  TO_ANALYZE = 'TO_ANALYZE',
  GO = 'GO',
  NOGO = 'NOGO',
  ANSWERED = 'ANSWERED',
  LOSS = 'LOSS',
  WIN = 'WIN',
}
