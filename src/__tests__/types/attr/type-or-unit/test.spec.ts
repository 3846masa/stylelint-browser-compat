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
      allow: {
        features: ['selectors.before', 'properties.content', 'types.attr.fallback'],
      },
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id::before {
          content: attr(data-foo string) " ";
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('"string" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id::before {
          content: attr(data-foo string, "default") " ";
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('"string" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
