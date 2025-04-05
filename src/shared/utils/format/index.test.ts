import { formatCurrency, formatDurationValue } from '.';

describe('formatCurrency', () => {
  it('returns a valid formatted number', () => {
    expect(formatCurrency(1000000)).toEqual('1M€');
    expect(formatCurrency(1400000)).toEqual('1,4M€');
    expect(formatCurrency(100000)).toEqual('100k€');
    expect(formatCurrency(100400)).toEqual('100,4k€');
    expect(formatCurrency(10000)).toEqual('10k€');
    expect(formatCurrency(10400)).toEqual('10,4k€');
    expect(formatCurrency(1000)).toEqual('1k€');
    expect(formatCurrency(1400)).toEqual('1,4k€');
    expect(formatCurrency(100)).toEqual('100€');
    expect(formatCurrency(10)).toEqual('10€');
    expect(formatCurrency(1)).toEqual('1€');
    expect(formatCurrency()).toEqual(null);
  });
});

describe('formatDurationValue', () => {
  it('returns a valid formatted duration', () => {
    expect(formatDurationValue(1)).toEqual('1 mois');
    expect(formatDurationValue(2)).toEqual('2 mois');
    expect(formatDurationValue(10)).toEqual('10 mois');
    expect(formatDurationValue(undefined)).toEqual(null);
    expect(formatDurationValue(null)).toEqual(null);
  });
});
