import { formatPrice } from './currency';

describe('formatPrice', () => {
  test('returns an empty string when price is null or undefined', () => {
    expect(formatPrice(null)).toBe('');
    expect(formatPrice(undefined)).toBe('');
  });

  test('formats price correctly without options', () => {
    expect(formatPrice({ amount: '1234.567', currencyCode: 'AUD' })).toBe(
      '$1234.57',
    );
  });

  test('formats price correctly with currencyCode option set to true', () => {
    expect(
      formatPrice(
        { amount: '1234.567', currencyCode: 'AUD' },
        { currencyCode: true },
      ),
    ).toBe('$1234.57 AUD');
  });

  test('formats price correctly with currencyCode option set to false', () => {
    expect(
      formatPrice(
        { amount: '1234.567', currencyCode: 'AUD' },
        { currencyCode: false },
      ),
    ).toBe('$1234.57');
  });

  test('formats price correctly with exactly two decimal places', () => {
    expect(formatPrice({ amount: '1234.50', currencyCode: 'AUD' })).toBe(
      '$1234.50',
    );
  });

  test('formats price correctly with one decimal place', () => {
    expect(formatPrice({ amount: '1234.5', currencyCode: 'AUD' })).toBe(
      '$1234.50',
    );
  });

  test('formats price correctly with no decimal places', () => {
    expect(formatPrice({ amount: '1234', currencyCode: 'AUD' })).toBe(
      '$1234.00',
    );
  });
});
