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
        features: ['types.color.rgba.space_separated_parameters'],
      },
      browserslist: 'chrome 64',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: rgba(128.5, 128.5, 128.5, 0.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 40,
      message: messages.rejected('Float values in rgba() parameters', 'Chrome 64', ''),
    },
    {
      code: stripIndent`
        #id {
          color: rgba(128.5 128.5 128.5 / 0.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 39,
      message: messages.rejected('Float values in rgba() parameters', 'Chrome 64', ''),
    },
  ],
});
