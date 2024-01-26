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
      browserslist: 'chrome 11',
    },
  ],
  reject: [
    {
      code: stripIndent`
        meter::-webkit-meter-suboptimum-value {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 38,
      message: messages.rejected(
        '"::-webkit-meter-suboptimum-value" pseudo-element',
        'Chrome 11',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-meter-suboptimum-value',
      ),
    },
  ],
});
