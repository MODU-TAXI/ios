module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['nativewind/babel'],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['*'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@types': './src/types',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@api': './src/api',
        },
      },
    ],
  ],
};
