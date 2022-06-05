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
        features: ['types.color.hsl.space_separated_parameters'],
      },
      browserslist: 'chrome 64',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: hsl(360, 100%, 50%, 0.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected('Alpha parameter passed to hsl()', 'Chrome 64', ''),
    },
    {
      code: stripIndent`
        #id {
          color: hsl(360 100% 50% / 0.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('Alpha parameter passed to hsl()', 'Chrome 64', ''),
    },
  ],
});
