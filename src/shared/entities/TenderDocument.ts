export class TenderDocument {
  id: number;
  originalName: string;
  prettyName: string;
  S3FileURL: string;
  type: TenderDocumentType;
  section: 'Général' | `Lot ${number}`;
  originalFilePath: string;
}

export enum TenderDocumentType {
  DCE = 'DCE',
  RC = 'RC',
  COMPLEMENT = 'COMPLEMENT',
  AVIS = 'AVIS',
  DUME = 'DUME',
}
