import type { Filters } from './StreamFilterSettings';

export default class Stream {
  id: number;
  name: string;
  filterSettings: Filters;
  streamSectionId?: number;
  pendingDecisionCount: number;
}
