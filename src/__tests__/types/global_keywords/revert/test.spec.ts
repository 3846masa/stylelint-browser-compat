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
      browserslist: 'chrome 83',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: revert;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected('"revert" value', 'Chrome 83', 'https://developer.mozilla.org/docs/Web/CSS/revert'),
    },
  ],
});
