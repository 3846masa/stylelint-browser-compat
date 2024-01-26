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
      browserslist: 'chrome 88',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (forced-colors: active) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 22,
      message: messages.rejected(
        '"forced-colors" media feature',
        'Chrome 88',
        'https://developer.mozilla.org/docs/Web/CSS/@media/forced-colors',
      ),
    },
  ],
});
