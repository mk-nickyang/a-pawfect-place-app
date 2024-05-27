import { type PropsWithChildren, useState, useEffect } from 'react';
import { InteractionManager } from 'react-native';

export const RenderAfterInteraction = ({ children }: PropsWithChildren) => {
  const [isInteractionCompleted, setIsInteractionCompleted] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsInteractionCompleted(true);
    });
  }, []);

  return isInteractionCompleted ? children : null;
};
