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
        features: ['types.color.rgb.alpha_parameter'],
      },
      browserslist: 'chrome 64',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: rgb(255 255 255);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('Space-separated rgb() parameters', 'Chrome 64', ''),
    },
    {
      code: stripIndent`
        #id {
          color: rgb(255 255 255 / 0.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('Space-separated rgb() parameters', 'Chrome 64', ''),
    },
  ],
});
