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
      browserslist: 'chrome 40',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: unset;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected('"unset" value', 'Chrome 40', 'https://developer.mozilla.org/docs/Web/CSS/unset'),
    },
  ],
});
