
import { useSuspenseQuery } from '@tanstack/react-query';

import { getActiveUser } from '../api/magellan/users';

export function useActiveUserQuery() {
  const query = useSuspenseQuery({
    queryKey: [getActiveUser.name],
    queryFn: getActiveUser,
  });

  return query;
}
