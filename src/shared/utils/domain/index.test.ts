import { concatPostalCode } from '.';

describe('concatPostalCode', () => {
  it('should return buyerName when buyerPostalCode is null', () => {
    const result = concatPostalCode('John Doe', null);
    expect(result).toBe('John Doe');
  });

  it('should return buyerName when buyerPostalCode is undefined', () => {
    const result = concatPostalCode('John Doe', undefined);
    expect(result).toBe('John Doe');
  });

  it('should return buyerName when buyerPostalCode is an empty string', () => {
    const result = concatPostalCode('John Doe', '');
    expect(result).toBe('John Doe');
  });

  it('should return buyerName when buyerPostalCode is not a number', () => {
    const result = concatPostalCode('John Doe', 'abc');
    expect(result).toBe('John Doe');
  });

  it('should return concatenated string when buyerPostalCode is a valid number', () => {
    const result = concatPostalCode('John Doe', '12345');
    expect(result).toBe('John Doe - 12345');
  });

  it('should trim buyerPostalCode and return concatenated string when buyerPostalCode has leading/trailing spaces', () => {
    const result = concatPostalCode('John Doe', ' 12345 ');
    expect(result).toBe('John Doe - 12345');
  });
});
