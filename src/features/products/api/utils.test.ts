import { parseProductFilterGQLQueryString } from './utils';

describe('parseProductFilterGQLQueryString', () => {
  test('IF no `min` or `max` price, only return the `available` filter', () => {
    expect(
      parseProductFilterGQLQueryString({
        available: false,
      }),
    ).toBe('');
    expect(
      parseProductFilterGQLQueryString({
        available: true,
      }),
    ).toBe('{ available: true }');
  });

  test('IF ONLY `min` price exists, return the joined filter string', () => {
    expect(
      parseProductFilterGQLQueryString({
        available: false,
        price: { min: 10 },
      }),
    ).toBe('{ price: { min: 10 } }');
    expect(
      parseProductFilterGQLQueryString({
        available: true,
        price: { min: 10 },
      }),
    ).toBe('{ available: true }, { price: { min: 10 } }');
  });

  test('IF ONLY `max` price exists, return the joined filter string', () => {
    expect(
      parseProductFilterGQLQueryString({
        available: false,
        price: { max: 100 },
      }),
    ).toBe('{ price: { max: 100 } }');
    expect(
      parseProductFilterGQLQueryString({
        available: true,
        price: { max: 100 },
      }),
    ).toBe('{ available: true }, { price: { max: 100 } }');
  });

  test('IF both `min` and `max` price exists, return the joined filter string', () => {
    expect(
      parseProductFilterGQLQueryString({
        available: false,
        price: { min: 10, max: 100 },
      }),
    ).toBe('{ price: { min: 10, max: 100 } }');
    expect(
      parseProductFilterGQLQueryString({
        available: true,
        price: { min: 10, max: 100 },
      }),
    ).toBe('{ available: true }, { price: { min: 10, max: 100 } }');
  });
});
