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
      browserslist: 'chrome 22',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          clip-path: none;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 12,
      message: messages.rejected(
        '"clip-path" property',
        'Chrome 22',
        'https://developer.mozilla.org/docs/Web/CSS/clip-path',
      ),
    },
  ],
});
