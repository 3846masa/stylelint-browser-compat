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
      browserslist: 'safari 6.1',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :future(p, span) {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 17,
      message: messages.rejected(
        '":future" pseudo-class',
        'Safari 6.1',
        'https://developer.mozilla.org/docs/Web/CSS/:future',
      ),
    },
  ],
});
