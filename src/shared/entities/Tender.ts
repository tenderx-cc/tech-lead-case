import type { BuyerContact } from './Buyer';
import type Buyer from './Buyer';
import type { TenderCategory } from './Category';
import type { Cpv } from './Cpv';
import type { DataPointMeta } from './DataPointMeta';
import type { DceRequestStatus } from './DceRequestStatus';
import type { Interaction } from './Interaction';
import type { Location } from './Location';
import type Lot from './Lot';
import type { TenderDocument } from './TenderDocument';

export enum TenderStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export default class Tender {
  id: number;
  boampId: string | null;
  ojeuId: string | null;
  buyerInternalReference?: string | null;
  title: string;
  category: TenderCategory;
  description?: string;
  cpvs?: Cpv[];
  status: TenderStatus;
  buyerProfileParticipationURL?: string;
  documents: TenderDocument[];
  executionLocation?: Location;
  publicationDate: string;
  responseDeadline?: string;
  attributionDate?: string;
  lots?: Lot[];
  dceRequestStatus: DceRequestStatus;
  interaction?: Interaction;

  estimatedValueInEur?: number;
  estimatedValueInEurMeta?: DataPointMeta<number>;
  durationInMonth?: number;
  durationInMonthMeta?: DataPointMeta<number>;
  isEstimatedValueInEurLLMEnriched?: boolean;
  isDurationInMonthLLMEnriched?: boolean;

  buyer: Buyer;
  buyerContact?: BuyerContact;
  buyerName?: string;
  buyerNationalId?: string;
  buyerWebsiteURL?: string;

  affectedStreamIds?: number[];

  isRenewal?: boolean | null;
  markedAsRenewalAt?: Date | null;
}

export type RagGenerability = {
  isGeneratable: boolean;
  error?: RagBlockingReason;
};

export enum RagBlockingReason {
  NO_DOCUMENTS = 'NO_DOCUMENTS',
  NO_SUPPORTED_DOCUMENTS = 'NO_SUPPORTED_DOCUMENTS',
}

export type TenderWithRagGenerability = Tender & {
  ragGenerability: RagGenerability;
};
