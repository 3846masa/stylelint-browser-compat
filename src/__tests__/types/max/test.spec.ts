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
      browserslist: 'chrome 78',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: max(20vw, 400px);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"max()" function', 'Chrome 78', 'https://developer.mozilla.org/docs/Web/CSS/max'),
    },
  ],
});
