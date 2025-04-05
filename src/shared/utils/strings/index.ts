export function removeTrailingZeros(str: string, minTargetLength = 0): string {
  let result = str;
  while (result.endsWith('0') && result.length > minTargetLength) {
    result = result.slice(0, -1);
  }
  return result;
}

export function isValidEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

export function extractDomainFromEmail(email: string) {
  const domain = email.split('@')[1];
  const parts = domain.split('.');
  if (parts.length <= 2) {
    return domain;
  }
  return parts.slice(-2).join('.');
}

export function removeEmoji(string: string) {
  const regexEmoji =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
  return string.replace(regexEmoji, '');
}

export function encodeObjectToBase64<T extends object>(obj: T): string {
  // throw if object is empty
  if (Object.keys(obj).length === 0) {
    throw new Error('Object is empty');
  }
  const locationData = JSON.stringify(obj);
  // using TextEncoder to encode strings containing characters outside of the ASCII range
  const utf8Array = new TextEncoder().encode(locationData);
  const base64String = btoa(String.fromCharCode(...utf8Array));
  const urlSafeEncodedData = encodeURIComponent(base64String);
  return urlSafeEncodedData;
}

export function decodeObjectFromBase64<T extends object>(
  encodedData: string,
): T | null {
  if (!encodedData.length) {
    return null;
  }
  const urlSafeEncodedData = decodeURIComponent(encodedData);

  try {
    const decodedData = atob(urlSafeEncodedData);
    const utf8Array = new Uint8Array(
      decodedData.split('').map(char => char.charCodeAt(0)),
    );
    const decodedString = new TextDecoder().decode(utf8Array);

    return JSON.parse(decodedString) as T;
  } catch (e) {
    return null;
  }
}

export function normalizeString(string: string) {
  return string
    .normalize('NFD') // Normalize to decomposed form (letters are separate from accents)
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .toLowerCase();
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Compares two strings in a way that handles numbers naturally.
 * This is useful for sorting strings containing numbers in a human-friendly order.
 * ie. ['1', '2', '10'] instead of ['1', '10', '2']
 *
 * @param {string} a - The first string to compare.
 * @param {string} b - The second string to compare.
 * @returns {number} - Returns -1 if `a` < `b`, 1 if `a` > `b`, and 0 if `a` === `b`.
 */
export function naturalCompare(a: string, b: string): number {
  if (a === '' && b === '') return 0;
  if (a === '') return -1;
  if (b === '') return 1;

  const aParts = a
    .split(/(\d+)/)
    .map(part => (isNaN(Number(part)) ? part : Number(part)));
  const bParts = b
    .split(/(\d+)/)
    .map(part => (isNaN(Number(part)) ? part : Number(part)));

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    if (aParts[i] === undefined) return -1;
    if (bParts[i] === undefined) return 1;
    if (aParts[i] < bParts[i]) return -1;
    if (aParts[i] > bParts[i]) return 1;
  }

  return 0;
}
