export function formatNumberAsText(value: number) {
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const formattedNumber = parts.join(',');
  return formattedNumber;
}
