import type { Location } from './Location';

export default class Buyer {
  id: string;
  email?: string;
  phone?: string;

  originalName: string;
  normalizedName: string; //lowercase name + postalCode
  nationalId?: string;
  logoURL?: string;
  domainURL?: string;

  isMunicipality?: boolean;
  postalCode?: string;
  contact: BuyerContact;
  sources?: DataSource[];
}

class DataSource {
  sourceName: string;
  sourceId: string;
  seededAt: Date;
}

export class BuyerContact {
  contact?: string;
  interlocutor?: string;
  email?: string;
  phone?: string;
  location?: Location;
}
