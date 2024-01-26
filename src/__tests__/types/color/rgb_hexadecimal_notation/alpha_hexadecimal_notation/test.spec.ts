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
        features: ['types.color.rgb.alpha_parameter'],
      },
      browserslist: 'chrome 61',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: #0066FFAA;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 19,
      message: messages.rejected('RGBA hexadecimal notation', 'Chrome 61', ''),
    },
    {
      code: stripIndent`
        #id {
          color: #06FA;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected('RGBA hexadecimal notation', 'Chrome 61', ''),
    },
  ],
});
