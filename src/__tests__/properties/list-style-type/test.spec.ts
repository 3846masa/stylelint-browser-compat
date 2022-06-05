/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: '>= 0%',
    },
  ],
  accept: [
    {
      code: stripIndent`
        #id {
          list-style-type: disc;
        }
      `,
    },
  ],
});
