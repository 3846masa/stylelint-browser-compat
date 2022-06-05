/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      allow: {
        features: ['properties.appearance'],
      },
      browserslist: 'chrome 81',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          appearance: auto;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 19,
      message: messages.rejected('"auto" value specified as appearance', 'Chrome 81', ''),
    },
  ],
});
