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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -moz-float-edge: padding-box;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 18,
      message: messages.rejected(
        '"-moz-float-edge" property',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/-moz-float-edge',
      ),
    },
  ],
});
