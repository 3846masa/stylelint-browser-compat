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
      browserslist: 'firefox 68',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -moz-binding: url("https://www.mozilla.org/xbl/htmlBindings.xml#checkbox");
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"-moz-binding" property',
        'Firefox 68',
        'https://developer.mozilla.org/docs/Web/CSS/-moz-binding',
      ),
    },
  ],
});
