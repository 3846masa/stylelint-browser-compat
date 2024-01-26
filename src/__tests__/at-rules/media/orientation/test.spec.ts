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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (orientation: landscape) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 20,
      message: messages.rejected(
        '"orientation" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/orientation',
      ),
    },
  ],
});
