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
      browserslist: 'chrome 80',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color-scheme: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"color-scheme" property',
        'Chrome 80',
        'https://developer.mozilla.org/docs/Web/CSS/color-scheme',
      ),
    },
  ],
});
