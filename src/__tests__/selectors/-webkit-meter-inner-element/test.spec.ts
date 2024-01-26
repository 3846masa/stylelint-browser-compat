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
      browserslist: 'chrome 22',
    },
  ],
  reject: [
    {
      code: stripIndent`
        meter::-webkit-meter-inner-element {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 35,
      message: messages.rejected(
        '"::-webkit-meter-inner-element" pseudo-element',
        'Chrome 22',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-inner-element',
      ),
    },
  ],
});
