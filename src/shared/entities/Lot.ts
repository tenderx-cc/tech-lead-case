import type { Cpv } from './Cpv';

export default class Lot {
  reference: string;
  title: string;
  description?: string;
  cpvs?: Cpv[];
  valueInEur?: number;
  durationInMonths?: number;
  executionLocationString?: string;
}
