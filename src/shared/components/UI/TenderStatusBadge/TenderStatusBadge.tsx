import type { TenderStatus } from '../../../entities/Tender';
import { Badge } from '../Badge/Badge';

interface TenderStatusBadgeProps {
  status?: TenderStatus;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function TenderStatusBadge({ status }: TenderStatusBadgeProps) {
  if (!status) {
    return null;
  }

  if (status === 'OPEN') {
    return <Badge content="Ouvert" color="teal" />;
  }

  if (status === 'CLOSED') {
    return <Badge content="Fermé" color="red" />;
  }

  throw new Error(`Unknown status: ${status}`);
}
