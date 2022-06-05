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
      browserslist: 'chrome 14',
    },
  ],
  reject: [
    {
      code: stripIndent`
        div:fullscreen {
        }
      `,
      line: 1,
      column: 4,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        '":fullscreen" pseudo-class',
        'Chrome 14',
        'https://developer.mozilla.org/docs/Web/CSS/:fullscreen',
      ),
    },
  ],
});
