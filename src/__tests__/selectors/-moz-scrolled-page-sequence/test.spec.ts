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
        ::-moz-scrolled-page-sequence {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 30,
      message: messages.rejected(
        '"::-moz-scrolled-page-sequence" pseudo-element',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/::-moz-scrolled-page-sequence',
      ),
    },
  ],
});
