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
      browserslist: 'edge 17',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -webkit-mask-position-x: center;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected(
        '"-webkit-mask-position-x" property',
        'Edge 17',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-x',
      ),
    },
  ],
});
