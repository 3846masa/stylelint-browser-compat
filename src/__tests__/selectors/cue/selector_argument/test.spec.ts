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
      browserslist: 'firefox 55',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ::cue(#id) {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 11,
      message: messages.rejected('"::cue" pseudo-element with selector argument', 'Firefox 55', ''),
    },
  ],
});
