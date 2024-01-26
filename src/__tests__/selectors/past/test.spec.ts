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
      browserslist: 'safari 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :past(p, span) {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        '":past" pseudo-class',
        'Safari 6',
        'https://developer.mozilla.org/docs/Web/CSS/:past',
      ),
    },
  ],
});
