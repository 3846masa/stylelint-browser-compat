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
      browserslist: 'ie 5.5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          word-spacing: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"word-spacing" property',
        'IE 5.5',
        'https://developer.mozilla.org/docs/Web/CSS/word-spacing',
      ),
    },
  ],
});
