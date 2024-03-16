import { ActivityIndicator, View, StyleSheet, FlexStyle } from 'react-native';

type Props = { height?: FlexStyle['height'] };

export const Loading = ({ height }: Props) => {
  return (
    <View style={[styles.container, { height }]}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
