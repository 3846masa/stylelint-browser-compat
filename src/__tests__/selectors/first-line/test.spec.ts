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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        p::first-line {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 14,
      message: messages.rejected(
        '"::first-line" pseudo-element',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/::first-line',
      ),
    },
  ],
});
