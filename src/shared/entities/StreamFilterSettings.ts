export type Filters = {
  keywords?: string[];
  status: string[];
  isRenewal?: boolean;
  categories?: string[];
  includedCPVs?: string[];
  excludedCPVs?: string[];
  buyerIds?: string[];
  locations?: string[];
  afterPublicationDate?: Date;
  beforePublicationDate?: Date;
  afterResponseDeadlineDate?: Date;
  beforeResponseDeadlineDate?: Date;
};

export type StreamFilterSettings = Filters & {
  skip?: number;
  take?: number;
  withDecision: boolean;
};

export type StreamFormValues = Filters & {
  name: string;
  streamSectionId?: number;
};
