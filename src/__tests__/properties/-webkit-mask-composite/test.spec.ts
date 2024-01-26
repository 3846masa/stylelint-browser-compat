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
      browserslist: 'edge 17',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -webkit-mask-composite: xor, source-over;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected(
        '"-webkit-mask-composite" property',
        'Edge 17',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-composite',
      ),
    },
  ],
});
