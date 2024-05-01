import { configs as sharedConfigs } from '@3846masa/configs/eslint/config.mjs';

/** @type {import('eslint').Linter.FlatConfig[]} */
const configs = [
  {
    ignores: ['lib/'],
  },
  ...sharedConfigs,
  {
    rules: {
      '@typescript-eslint/require-await': ['off'],
      'import/order': [
        'error',
        {
          pathGroups: [
            {
              group: 'external',
              pattern: '@mdn/browser-compat-data',
            },
          ],
        },
      ],
    },
  },
];

export default configs;
