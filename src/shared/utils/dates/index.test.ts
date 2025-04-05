// Import the entire luxon module to mock it
import * as luxon from 'luxon';
import { DateTime } from 'luxon';

import {
  formatDateAsText,
  parseDateToFrLocaleDateString,
  parseFrLocaleDateStringToDate,
} from '.';

describe('formatDateAsText', () => {
  // Mock DateTime.now to return a fixed date
  let nowSpy: jest.SpyInstance<DateTime, [], any>;

  beforeAll(() => {
    nowSpy = jest.spyOn(luxon.DateTime, 'now');
    const fixedDate = DateTime.fromObject({ year: 2024, month: 2, day: 13 });
    nowSpy.mockReturnValue(fixedDate);

    jest.spyOn(fixedDate, 'toLocaleString').mockReturnValue('13 Feb 2024');
  });

  it('formats a provided date string correctly', () => {
    const date = '2023-04-05';
    const expected = 'Apr 05, 2023';
    expect(formatDateAsText({ date })).toBe(expected);
  });

  it('handles an invalid date string gracefully', () => {
    const invalidDate = 'not-a-date';
    const expected = 'Invalid DateTime';
    expect(formatDateAsText({ date: invalidDate })).toBe(expected);
  });

  it('formats a provided date string correctly without the year', () => {
    const date = '2023-04-05';
    const expected = 'Apr 05';
    expect(formatDateAsText({ date, dayOnly: true })).toBe(expected);
  });

  it('formats a provided date string with long month', () => {
    const date = '2023-04-05';
    const expected = 'April 05, 2023';
    expect(formatDateAsText({ date, truncateMonth: false })).toBe(expected);
  });
});

describe('parseFrLocaleDateStringToDate', () => {
  it('parses a French locale date string to a Date object', () => {
    const dateString = '25/12/2020';
    const expectedDate = new Date(2020, 11, 25); // Months are 0-indexed in JavaScript Date
    expect(parseFrLocaleDateStringToDate(dateString)).toEqual(expectedDate);
  });

  it('handles invalid date strings gracefully', () => {
    const dateString = 'invalid-date';
    expect(() => parseFrLocaleDateStringToDate(dateString)).toThrow(
      'Cannot parse invalid Date',
    );
  });
});

describe('parseDateToFrLocaleDateString', () => {
  it('parses a Date object to a French locale date string', () => {
    const date = new Date(2020, 11, 25); // 25th December 2020
    const expectedDateString = '25/12/2020';
    expect(parseDateToFrLocaleDateString(date)).toEqual(expectedDateString);
  });

  it('handles invalid Date objects gracefully', () => {
    const date = new Date('invalid-date');
    expect(() => parseDateToFrLocaleDateString(date)).toThrow(
      'Cannot parse invalid Date',
    );
  });
});
