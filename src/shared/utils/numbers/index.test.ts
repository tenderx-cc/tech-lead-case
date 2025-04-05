import { formatNumberAsText } from '.';

describe('formatNumberAsText', () => {
  it('formats a number correctly', () => {
    const number = 123456789;
    const expected = '123 456 789';
    expect(formatNumberAsText(number)).toBe(expected);
  });

  it('formats a number with a decimal correctly', () => {
    const number = 123456789.123;
    const expected = '123 456 789,123';
    expect(formatNumberAsText(number)).toBe(expected);
  });

  it('formats a negative number correctly', () => {
    const number = -123456789;
    const expected = '-123 456 789';
    expect(formatNumberAsText(number)).toBe(expected);
  });

  it('formats a negative number with a decimal correctly', () => {
    const number = -123456789.123;
    const expected = '-123 456 789,123';
    expect(formatNumberAsText(number)).toBe(expected);
  });
});
