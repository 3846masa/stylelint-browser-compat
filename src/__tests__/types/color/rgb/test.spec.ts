/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
});

testRule({
  ruleName,
  config: [
    true,
    {
      allow: {
        features: ['properties.color'],
      },
      browserslist: '>= 0%, not android < 4.4',
    },
  ],
  accept: [
    {
      code: stripIndent`
        #id {
          color: rgb(255, 255, 255);
        }
      `,
    },
  ],
});
