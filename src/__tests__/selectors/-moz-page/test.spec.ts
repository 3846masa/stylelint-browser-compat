/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ::-moz-page {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 12,
      message: messages.rejected(
        '"::-moz-page" pseudo-element',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/::-moz-page',
      ),
    },
  ],
});
