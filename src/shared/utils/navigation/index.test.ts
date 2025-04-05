import { extractDomainFromURL } from '.';

describe('extractDomainFromURL', () => {
  it('returns a valid domain', () => {
    expect(
      extractDomainFromURL('https://www.chr-orleans.fr/a-propos?q=test#world'),
    ).toEqual('chr-orleans.fr');
    expect(
      extractDomainFromURL('https://marches.lagarennecolombes.fr/'),
    ).toEqual('lagarennecolombes.fr');
  });
});
