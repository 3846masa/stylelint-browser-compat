/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
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
        summary::-webkit-details-marker {
        }
      `,
      line: 1,
      column: 8,
      endLine: 1,
      endColumn: 32,
      message: messages.rejected('"::-webkit-details-marker" pseudo-element', 'Chrome 11', ''),
    },
  ],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'chrome 89',
    },
  ],
  reject: [
    {
      code: stripIndent`
        summary::-webkit-details-marker {
        }
      `,
      line: 1,
      column: 8,
      endLine: 1,
      endColumn: 32,
      message: messages.rejected('"::-webkit-details-marker" pseudo-element', 'Chrome 89', ''),
    },
  ],
});
