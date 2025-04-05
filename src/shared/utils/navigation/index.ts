import type { Location } from '../../entities/Location';

export function extractDomainFromURL(url: string) {
  const urlObj = new URL(url);
  const parts = urlObj.hostname.split('.');
  const tld = parts.pop();
  const domain = parts.pop();
  return `${domain}.${tld}`;
}

export function goToGmap(location: Location) {
  if (!location.city && !location.address && !location.postalCode) {
    throw new Error(
      `Could not open Google Maps as no relevant location information is provided: ${JSON.stringify(location)}`,
    );
  }
  const gmapQuery = [location.city, location.address, location.postalCode]
    .filter(Boolean)
    .join(' ');

  const url = `https://www.google.com/maps/search/?api=1&query=${gmapQuery}`;

  window.open(url, '_blank');
}
