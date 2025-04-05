import type Buyer from '../../../entities/Buyer';
import type Tender from '../../../entities/Tender';
import type {
  RagGenerability,
  TenderWithRagGenerability,
} from '../../../entities/Tender';
import type { Pagination } from '../types';

export type FindOneTenderResponseDTO = Tender & {
  buyer: Buyer & { numberOfContacts: number };
  ragGenerability: RagGenerability;
};

export type SearchTenderDTO = {
  pagination: Pagination;
  results: TenderWithRagGenerability[];
};

export type UpdateOwnerResponseDTO = {
  newOwnerId: number;
};
