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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transform: rotate(attr(data-foo angle));
        }
      `,
      line: 2,
      column: 35,
      endLine: 2,
      endColumn: 40,
      message: messages.rejected('"angle" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          transform: rotate(attr(data-foo deg));
        }
      `,
      line: 2,
      column: 35,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected('"deg" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          transform: rotate(attr(data-foo grad));
        }
      `,
      line: 2,
      column: 35,
      endLine: 2,
      endColumn: 39,
      message: messages.rejected('"grad" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          transform: rotate(attr(data-foo rad));
        }
      `,
      line: 2,
      column: 35,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected('"rad" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
