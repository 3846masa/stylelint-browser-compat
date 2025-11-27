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
        ::-webkit-progress-inner-element {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 33,
      message: messages.rejected(
        'selectors.-webkit-progress-inner-element',
        '"::-webkit-progress-inner-element" pseudo-element',
        'Chrome 22',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/::-webkit-progress-inner-element',
      ),
    },
  ],
});
