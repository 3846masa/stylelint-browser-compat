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
      browserslist: 'firefox 33',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-feature-values Font One {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 21,
      message: messages.rejected(
        'at-rules.font-feature-values',
        '"@font-feature-values" at rules',
        'Firefox 33',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@font-feature-values',
      ),
    },
  ],
});
