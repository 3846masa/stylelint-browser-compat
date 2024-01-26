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
    [
      'polyfill-es-shims',
      {
        method: 'usage-pure',
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
    node: '18',
  },
};
