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
      browserslist: 'opera 12.1',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          appearance: menulist-button;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"menulist-button" value specified as appearance', 'Opera 12.1', ''),
    },
  ],
});
