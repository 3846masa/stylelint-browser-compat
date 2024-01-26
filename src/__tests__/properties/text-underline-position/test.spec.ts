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
      browserslist: 'chrome 32',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          text-underline-position: auto;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected(
        '"text-underline-position" property',
        'Chrome 32',
        'https://developer.mozilla.org/docs/Web/CSS/text-underline-position',
      ),
    },
  ],
});
