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
      browserslist: 'ie 11',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:read-only {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 16,
      message: messages.rejected(
        '":read-only" pseudo-class',
        'IE 11',
        'https://developer.mozilla.org/docs/Web/CSS/:read-only',
      ),
    },
  ],
});
