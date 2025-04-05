import type { DecisionStatus } from '../../../entities/Interaction';
import type { Interaction } from '../../../entities/Interaction';
import { magellanClient } from '../../../infra/axios';

export async function upsertInteractionWithDecisionStatus(
  tenderId: number,
  status: DecisionStatus,
  streamId?: number,
): Promise<Interaction> {
  const payload = streamId ? { status, streamId } : { status };

  const response = await magellanClient.post<Interaction>(
    `tenders/${tenderId}/interactions/decisionStatus`,
    payload,
  );

  return response.data;
}
