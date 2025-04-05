import { formatExecutionLocation } from '.';
import type { Location } from '../../entities/Location';

describe('formatExecutionLocation', () => {
  it('should correctly format the location when city and postal code are provided', () => {
    const location = {
      city: 'Paris',
      postalCode: '75000',
    } as Location;
    const expected = 'Paris - 75';
    expect(formatExecutionLocation(location)).toBe(expected);
  });

  it('should correctly format the location when city and department code are provided', () => {
    const location = {
      city: 'Paris',
      postalCode: '75',
    } as Location;
    const expected = 'Paris - 75';
    expect(formatExecutionLocation(location)).toBe(expected);
  });

  it('should correctly format the location when only city is provided', () => {
    const location = {
      city: 'Paris',
    } as Location;
    const expected = 'Paris';
    expect(formatExecutionLocation(location)).toBe(expected);
  });

  it('should correctly format the location when only department code is provided', () => {
    const location = {
      postalCode: '75',
    } as Location;
    const expected = '75';
    expect(formatExecutionLocation(location)).toBe(expected);
  });

  it('should correctly format the location when only postal code is provided', () => {
    const location = {
      postalCode: '75000',
    } as Location;
    const expected = '75';
    expect(formatExecutionLocation(location)).toBe(expected);
  });

  it('should correctly format the location when no location is provided', () => {
    const location = undefined;
    const expected = '-';
    expect(formatExecutionLocation(location)).toBe(expected);
  });
});
