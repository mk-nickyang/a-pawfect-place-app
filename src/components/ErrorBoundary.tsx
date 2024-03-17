import * as Sentry from '@sentry/react-native';
import { Component, PropsWithChildren } from 'react';

import { Box } from './Box';
import { Text } from './Text';

class ErrorBoundary extends Component<
  PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    Sentry.captureException(error, info.componentStack);
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
