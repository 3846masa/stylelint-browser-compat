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
        features: ['types.color.rgb.space_separated_parameters'],
      },
      browserslist: 'chrome 64',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: rgb(128.5, 128.5, 128.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected('Float values in rgb() parameters', 'Chrome 64', ''),
    },
    {
      code: stripIndent`
        #id {
          color: rgb(128.5 128.5 128.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('Float values in rgb() parameters', 'Chrome 64', ''),
    },
  ],
});
