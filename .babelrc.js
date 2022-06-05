module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '~': './src',
        },
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
      },
    ],
    '@babel/preset-typescript',
  ],
  targets: {
    node: '14',
  },
};
