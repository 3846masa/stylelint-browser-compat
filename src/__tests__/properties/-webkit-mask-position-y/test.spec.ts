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
          -webkit-mask-position-y: center;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected(
        '"-webkit-mask-position-y" property',
        'Edge 17',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-y',
      ),
    },
  ],
});
