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
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:valid {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 12,
      message: messages.rejected('":valid" pseudo-class', 'IE 9', 'https://developer.mozilla.org/docs/Web/CSS/:valid'),
    },
  ],
});
