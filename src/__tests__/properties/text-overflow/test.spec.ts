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
      browserslist: 'firefox 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          text-overflow: clip;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected(
        '"text-overflow" property',
        'Firefox 6',
        'https://developer.mozilla.org/docs/Web/CSS/text-overflow',
      ),
    },
  ],
});
