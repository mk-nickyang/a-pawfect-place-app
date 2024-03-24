/**
 * Input: '2020-12-21T12:59:42Z'
 * Output: 'Dec 21, 2020'
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const currentYear = new Date().getFullYear();
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
  };

  // Add the year to the format only if it's not the current year
  if (date.getFullYear() !== currentYear) {
    formatOptions.year = 'numeric';
  }

  return date.toLocaleDateString('en-US', formatOptions);
};
