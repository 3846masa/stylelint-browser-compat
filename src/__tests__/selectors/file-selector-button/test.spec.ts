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
      browserslist: 'firefox 81',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input[type=file]::file-selector-button {
        }
      `,
      line: 1,
      column: 17,
      endLine: 1,
      endColumn: 39,
      message: messages.rejected(
        '"::file-selector-button" pseudo-element',
        'Firefox 81',
        'https://developer.mozilla.org/docs/Web/CSS/::file-selector-button',
      ),
    },
  ],
});
