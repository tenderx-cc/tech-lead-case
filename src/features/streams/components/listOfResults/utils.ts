import { DecisionStatus } from '../../../../shared/entities/Interaction';

export function getBackgroundFromDecisionStatus(
  decisionStatus?: DecisionStatus,
) {
  switch (decisionStatus) {
    case DecisionStatus.TO_ANALYZE:
    case DecisionStatus.GO:
    case DecisionStatus.ANSWERED:
    case DecisionStatus.WIN:
      return `linear-gradient(86.95deg, rgba(255, 255, 255, 0.06) 83.71%, rgba(26, 101, 229, 0.06) 110%)`;
    case DecisionStatus.REJECTED:
    case DecisionStatus.NOGO:
    case DecisionStatus.LOSS:
      return `linear-gradient(86.95deg, rgba(255, 255, 255, 0.06) 83.71%, rgba(205, 44, 44, 0.06) 100%)`;
    default:
      return `linear-gradient(86.95deg, rgba(90, 91, 111, 0.06) 0%, rgba(255, 255, 255, 0.06) 10.18%)`;
  }
}
