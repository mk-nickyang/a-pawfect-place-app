import { formatDate } from './date';

describe('formatDate', () => {
  test('formats date correctly when the date is in the past year', () => {
    expect(formatDate('2020-12-21T12:59:42Z')).toBe('Dec 21, 2020');
  });

  test('formats date correctly when the date is in the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(formatDate(`${currentYear}-05-21T12:59:42Z`)).toBe('May 21');
  });
});
