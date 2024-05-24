module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-react-compiler',
        {
          runtimeModule: 'react-compiler-runtime',
        },
      ],
      'react-native-reanimated/plugin', // `react-native-reanimated/plugin` has to be listed last.
    ],
  };
};
