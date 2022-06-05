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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        div:empty {
        }
      `,
      line: 1,
      column: 4,
      endLine: 1,
      endColumn: 10,
      message: messages.rejected('":empty" pseudo-class', 'IE 8', 'https://developer.mozilla.org/docs/Web/CSS/:empty'),
    },
  ],
});
