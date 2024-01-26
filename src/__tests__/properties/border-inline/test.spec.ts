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
      browserslist: 'chrome 86',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-inline: medium dashed green;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected(
        '"border-inline" property',
        'Chrome 86',
        'https://developer.mozilla.org/docs/Web/CSS/border-inline',
      ),
    },
  ],
});
