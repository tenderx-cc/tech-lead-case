import {
  capitalizeFirstLetter,
  decodeObjectFromBase64,
  encodeObjectToBase64,
  extractDomainFromEmail,
  isValidEmail,
  naturalCompare,
  normalizeString,
  removeEmoji,
  removeTrailingZeros,
} from '.';

describe('isValidEmail', () => {
  it('returns true for a valid email', () => {
    expect(isValidEmail('test')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('test@test')).toBe(true);
    expect(isValidEmail('test@test.paris')).toBe(true);
    expect(isValidEmail('345@123.fr')).toBe(true);
  });
});

describe('extractDomainFromEmail', () => {
  it('returns a valid domain', () => {
    expect(
      extractDomainFromEmail('marches.dag@angersloiremetropole.fr'),
    ).toEqual('angersloiremetropole.fr');
    expect(
      extractDomainFromEmail('bm.dmo.smee.dirso@developpement-durable.gouv.fr'),
    ).toEqual('gouv.fr');
  });
});

describe('removeEmoji function', () => {
  it('removes standard emojis from a string', () => {
    const input = 'Hello, world! 😊';
    const expected = 'Hello, world! ';
    const output = removeEmoji(input);
    expect(output).toEqual(expected);
  });

  it('removes complex emojis (skin tones, joiners) from a string', () => {
    const input = 'Good morning! 👋🏽👩‍👩‍👧‍👦';
    const expected = 'Good morning! ';
    const output = removeEmoji(input);
    expect(output).toEqual(expected);
  });

  it('removes emojis from the entire range of emoji characters', () => {
    const input = 'A mix of emojis 🤔👨‍🚀🌍✨🔥💖';
    const expected = 'A mix of emojis ';
    const output = removeEmoji(input);
    expect(output).toEqual(expected);
  });

  it('leaves the string unchanged if there are no emojis', () => {
    const input = 'Just a regular string.';
    const expected = 'Just a regular string.';
    const output = removeEmoji(input);
    expect(output).toEqual(expected);
  });

  it('handles empty strings correctly', () => {
    const input = '';
    const expected = '';
    const output = removeEmoji(input);
    expect(output).toEqual(expected);
  });
});

describe('Base64 Encoding and Decoding', () => {
  it('encodes and decodes an object to the same object', () => {
    const originalObject = { hello: 'world', emoji: '😊' };
    const encoded = encodeObjectToBase64(originalObject);
    const decoded = decodeObjectFromBase64(encoded);
    expect(decoded).toEqual(originalObject);
  });

  it('handles special characters in object values', () => {
    const originalObject = { special: '!@#$%^&*()_+{}:"<>?' };
    const encoded = encodeObjectToBase64(originalObject);
    const decoded = decodeObjectFromBase64(encoded);
    expect(decoded).toEqual(originalObject);
  });

  it('returns throw when encoding an empty object', () => {
    const emptyObject = {};
    expect(() => {
      encodeObjectToBase64(emptyObject);
    }).toThrow('Object is empty');
  });

  it('returns null when decoding an empty string', () => {
    const decoded = decodeObjectFromBase64('');
    expect(decoded).toBeNull();
  });

  it('return null on error', () => {
    const invalidBase64 = 'this is not a valid base64 string';
    const decoded = decodeObjectFromBase64(invalidBase64);
    expect(decoded).toBeNull();
  });
});

describe('normalizeString', () => {
  it('converts uppercase to lowercase', () => {
    expect(normalizeString('TEST')).toBe('test');
  });

  it('removes accents from characters', () => {
    expect(normalizeString('Café')).toBe('cafe');
    expect(normalizeString('Ångström')).toBe('angstrom');
    expect(normalizeString('François')).toBe('francois');
  });

  it('handles empty strings', () => {
    expect(normalizeString('')).toBe('');
  });

  it('removes accents and converts to lowercase', () => {
    expect(normalizeString('Élève')).toBe('eleve');
  });

  it('works with non-Latin characters that have diacritical marks', () => {
    expect(normalizeString('Доброе утро')).toBe('доброе утро'); // This is just a lowercase conversion test, as these characters do not have diacritical marks
    expect(normalizeString('Žluťoučký kůň')).toBe('zlutoucky kun');
  });
});

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a lowercase string', () => {
    expect(capitalizeFirstLetter('hello')).toEqual('Hello');
  });

  it('returns an empty string unchanged', () => {
    expect(capitalizeFirstLetter('')).toEqual('');
  });

  it('does not alter a string that is already capitalized', () => {
    expect(capitalizeFirstLetter('Hello')).toEqual('Hello');
  });

  it('keeps the rest of the letters as is if the string is in uppercase', () => {
    expect(capitalizeFirstLetter('HELLO')).toEqual('HELLO');
  });

  it('does not modify numbers or special characters at the start', () => {
    expect(capitalizeFirstLetter('123hello')).toEqual('123hello');
    expect(capitalizeFirstLetter('$hello')).toEqual('$hello');
  });

  it('correctly capitalizes a single character if it is lowercase', () => {
    expect(capitalizeFirstLetter('h')).toEqual('H');
  });

  it('handles strings with leading whitespace', () => {
    expect(capitalizeFirstLetter(' hello')).toEqual(' hello');
  });
});

describe('naturalCompare', () => {
  it('should sort numbers correctly', () => {
    expect(naturalCompare('1', '2')).toBe(-1);
    expect(naturalCompare('2', '10')).toBe(-1);
    expect(naturalCompare('10', '2')).toBe(1);
  });

  it('should sort alphanumeric strings correctly', () => {
    expect(naturalCompare('file1', 'file2')).toBe(-1);
    expect(naturalCompare('file2', 'file10')).toBe(-1);
    expect(naturalCompare('file10', 'file2')).toBe(1);
  });

  it('should sort mixed strings correctly', () => {
    expect(naturalCompare('a1', 'a2')).toBe(-1);
    expect(naturalCompare('a2', 'a10')).toBe(-1);
    expect(naturalCompare('a10', 'a2')).toBe(1);
  });

  it('should handle strings without numbers correctly', () => {
    expect(naturalCompare('apple', 'banana')).toBe(-1);
    expect(naturalCompare('banana', 'apple')).toBe(1);
    expect(naturalCompare('apple', 'apple')).toBe(0);
  });

  it('should handle strings with and without numbers correctly', () => {
    expect(naturalCompare('file1', 'file')).toBe(1);
    expect(naturalCompare('file', 'file1')).toBe(-1);
    expect(naturalCompare('file10', 'file2')).toBe(1);
  });

  it('should handle complex strings correctly', () => {
    expect(naturalCompare('file1a', 'file1b')).toBe(-1);
    expect(naturalCompare('file1b', 'file1a')).toBe(1);
    expect(naturalCompare('file1a1', 'file1a2')).toBe(-1);
    expect(naturalCompare('file1a2', 'file1a10')).toBe(-1);
  });

  it('should handle empty strings correctly', () => {
    expect(naturalCompare('', 'a')).toBe(-1);
    expect(naturalCompare('a', '')).toBe(1);
    expect(naturalCompare('', '')).toBe(0);
  });

  it('should handle strings with leading zeros correctly', () => {
    expect(naturalCompare('file01', 'file1')).toBe(0);
    expect(naturalCompare('file001', 'file1')).toBe(0);
    expect(naturalCompare('file002', 'file2')).toBe(0);
    expect(naturalCompare('file010', 'file10')).toBe(0);
  });
});

describe('removeTrailingZeros', () => {
  it('should remove trailing zeros from a number', () => {
    expect(removeTrailingZeros('123450')).toBe('12345');
    expect(removeTrailingZeros('100')).toBe('1');
    expect(removeTrailingZeros('000')).toBe('');

    expect(removeTrailingZeros('100', 1)).toBe('1');
    expect(removeTrailingZeros('100', 3)).toBe('100');
    expect(removeTrailingZeros('100', 4)).toBe('100');
    expect(removeTrailingZeros('000', 2)).toBe('00');
  });

  it('should leave classic string as is', () => {
    expect(removeTrailingZeros('test')).toBe('test');
    expect(removeTrailingZeros('test-00-test')).toBe('test-00-test');
  });
});
