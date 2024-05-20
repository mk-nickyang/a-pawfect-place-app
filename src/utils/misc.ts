export const safeJSONParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const transformHandleToTitle = (handle: string): string => {
  return handle
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');
};

export const fromGlobalId = (id: string) => {
  if (!id) return id;
  const arr = id.split('/');
  return arr[arr.length - 1];
};
