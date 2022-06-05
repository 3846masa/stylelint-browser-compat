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
      browserslist: 'chrome 5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input::-webkit-outer-spin-button {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 33,
      message: messages.rejected(
        '"::-webkit-outer-spin-button" pseudo-element',
        'Chrome 5',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-outer-spin-button',
      ),
    },
  ],
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
        input::-webkit-outer-spin-button {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 33,
      message: messages.rejected(
        '"::-webkit-outer-spin-button" pseudo-element',
        'Chrome 14',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-outer-spin-button',
      ),
    },
  ],
});
