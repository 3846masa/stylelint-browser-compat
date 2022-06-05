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
      browserslist: 'firefox 26',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input[type=color]::-moz-color-swatch {
        }
      `,
      line: 1,
      column: 18,
      endLine: 1,
      endColumn: 37,
      message: messages.rejected(
        '"::-moz-color-swatch" pseudo-element',
        'Firefox 26',
        'https://developer.mozilla.org/docs/Web/CSS/::-moz-color-swatch',
      ),
    },
  ],
});
