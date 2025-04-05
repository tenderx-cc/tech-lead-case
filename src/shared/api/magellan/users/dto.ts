import type { User } from '../../../entities/User';

export type GetActiveUserResponseDto = {
  user: User;
  ignoreInReporting: boolean;
};
