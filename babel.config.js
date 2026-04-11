// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // ← this already includes React, JSX, Flow, TypeScript, etc.
    plugins: [
      // Put any other plugins you want here (example: ['module-resolver', {...}]
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      // REANIMATED PLUGIN MUST BE **LAST**
      'react-native-reanimated/plugin',
    ],
  };
};