import type {
  Filters,
  StreamFilterSettings,
} from '../../../entities/StreamFilterSettings';
import { magellanClient } from '../../../infra/axios';
import type { SearchTenderDTO } from './dto';

export async function searchTenders(
  filter: Filters,
  skip: number,
  take: number,
  withDecision: boolean,
): Promise<SearchTenderDTO> {
  const streamFilterSettings: StreamFilterSettings = {
    ...filter,
    skip,
    take,
    withDecision,
  };
  console.log('streamFilterSettings', streamFilterSettings);
  const response = await magellanClient.post<SearchTenderDTO>(
    '/tenders/search',
    streamFilterSettings,
  );
  return response.data;
}
