export function concatPostalCode(
  buyerName: string,
  buyerPostalCode: string | null | undefined,
) {
  const postalCodeNumber = Number(buyerPostalCode?.trim());

  if (!postalCodeNumber || isNaN(postalCodeNumber)) {
    return buyerName;
  }

  return `${buyerName} - ${postalCodeNumber}`;
}
