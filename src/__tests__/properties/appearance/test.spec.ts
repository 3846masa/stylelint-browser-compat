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
      browserslist: 'opera 12.1',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          appearance: inherit;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected(
        '"appearance" property',
        'Opera 12.1',
        'https://developer.mozilla.org/docs/Web/CSS/appearance',
      ),
    },
  ],
});
