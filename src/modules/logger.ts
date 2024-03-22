import * as Sentry from '@sentry/react-native';

export const Logger = {
  error: (error: unknown) => {
    if (__DEV__) {
      console.log(error);
    } else {
      Sentry.captureException(error);
    }
  },
};
