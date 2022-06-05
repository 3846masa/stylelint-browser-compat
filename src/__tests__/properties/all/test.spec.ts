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
      browserslist: 'chrome 36',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          all: initial;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 6,
      message: messages.rejected('"all" property', 'Chrome 36', 'https://developer.mozilla.org/docs/Web/CSS/all'),
    },
  ],
});
