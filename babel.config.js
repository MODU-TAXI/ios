module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // native-wind 설정
    ['nativewind/babel'],
    // alias 설정
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@providers': './src/providers',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@type': './src/type', // types는 불가능해서 type으로 대체
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@recoil': './src/recoil',
          '@server': './src/server',
          '@axios': './src/axios',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
