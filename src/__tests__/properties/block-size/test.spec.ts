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
      browserslist: 'firefox 40',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          block-size: 300px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected(
        '"block-size" property',
        'Firefox 40',
        'https://developer.mozilla.org/docs/Web/CSS/block-size',
      ),
    },
  ],
});
