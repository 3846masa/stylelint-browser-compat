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
      browserslist: 'safari 10',
    },
  ],
  accept: [
    {
      code: stripIndent`
        ul >> li {
        }
      `,
    },
  ],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'safari 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ul >> li {
        }
      `,
      line: 1,
      column: 4,
      endLine: 1,
      endColumn: 6,
      message: messages.rejected('">>" syntax for descendant combinator', 'Safari 12', ''),
    },
  ],
});
