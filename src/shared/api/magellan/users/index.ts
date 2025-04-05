import { magellanClient } from '../../../infra/axios';
import type { GetActiveUserResponseDto } from './dto';

export async function getActiveUser(): Promise<GetActiveUserResponseDto> {
  const response =
    await magellanClient.get<GetActiveUserResponseDto>(`/users/me`);
  return response.data;
}
