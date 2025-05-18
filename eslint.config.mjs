import { configs as sharedConfigs } from '@3846masa/configs/eslint';

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  {
    ignores: ['lib/'],
  },
  ...sharedConfigs,
  {
    rules: {
      '@typescript-eslint/require-await': ['off'],
      'import/named': ['off'],
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
