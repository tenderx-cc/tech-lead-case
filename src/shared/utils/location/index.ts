import type { Location } from '../../entities/Location';

export function formatExecutionLocation(location: Location | undefined) {
  if (!location || (!location.city && !location.postalCode)) {
    return '-';
  }

  return [location.city, location.postalCode?.substring(0, 2)]
    .filter(Boolean)
    .join(' - ');
}
