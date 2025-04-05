// This simulates an in memory database for interactions
type InteractionDBEntry = {
  tenderId: number;
  decisionStatus: 'TO_ANALYZE' | 'REJECTED';
};
export const interactionsDB: InteractionDBEntry[] = [];
