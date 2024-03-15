import { useCallback, useLayoutEffect, useRef } from 'react';

type EventHandler = (...args: never[]) => unknown;

/**
 * `useEvent` will return an event handler with an always-stable function identity,
 * even if the props/state it references change.
 *
 * @see https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md#internal-implementation
 */
export const useEvent = <T extends EventHandler>(handler: T): T => {
  const handlerRef = useRef<T>(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Parameters<T>) => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []) as T;
};
