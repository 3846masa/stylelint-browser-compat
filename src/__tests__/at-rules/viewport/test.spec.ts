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
      browserslist: 'chrome 28',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @viewport {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 10,
      message: messages.rejected(
        '"@viewport" at rules',
        'Chrome 28',
        'https://developer.mozilla.org/docs/Web/CSS/@viewport',
      ),
    },
  ],
});
