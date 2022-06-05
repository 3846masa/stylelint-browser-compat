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
      browserslist: 'firefox 48',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -webkit-text-fill-color: red;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected(
        '"-webkit-text-fill-color" property',
        'Firefox 48',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-text-fill-color',
      ),
    },
  ],
});
