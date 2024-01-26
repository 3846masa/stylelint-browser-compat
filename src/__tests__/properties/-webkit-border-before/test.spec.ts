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
      browserslist: 'chrome 7',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -webkit-border-before: 1px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected(
        '"-webkit-border-before" property',
        'Chrome 7',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before',
      ),
    },
  ],
});
