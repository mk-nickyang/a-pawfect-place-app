import * as Sentry from '@sentry/react-native';
import { Component, PropsWithChildren } from 'react';
import { View, StyleSheet, Text } from 'react-native';

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
        <View style={styles.container}>
          <Text style={styles.text}>Something went wrong</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
