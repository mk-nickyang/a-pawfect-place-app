import { Component, type PropsWithChildren } from 'react';

import { Box } from './Box';
import { Text } from './Text';

import { Logger } from '@/modules/logger';

type Props = PropsWithChildren<{ onError?: () => void }>;

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.();
    Logger.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text variant="h2">Something went wrong</Text>
        </Box>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
