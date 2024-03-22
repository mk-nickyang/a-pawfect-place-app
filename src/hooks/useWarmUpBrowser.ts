import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

/**
 * On Android you can optionally warm up the web browser before it's used.
 * This allows the browser app to pre-initialize itself in the background.
 * Doing this can significantly speed up prompting the user for authentication.

 * @see https://docs.expo.dev/guides/authentication/#warming-the-browser
 */
export const useWarmUpBrowser = () => {
  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};
