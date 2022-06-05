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
      allow: {
        features: ['selectors.before', 'properties.content', 'types.attr.type-or-unit'],
      },
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id::before {
          content: attr(data-foo, "default") " ";
        }
      `,
      line: 2,
      column: 27,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected('Fallback value for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id::before {
          content: attr(data-foo string, "default") " ";
        }
      `,
      line: 2,
      column: 34,
      endLine: 2,
      endColumn: 43,
      message: messages.rejected('Fallback value for attr()', 'Chrome 100', ''),
    },
  ],
});
