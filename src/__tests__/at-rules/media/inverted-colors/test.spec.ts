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
      browserslist: 'safari 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (inverted-colors: inverted) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 24,
      message: messages.rejected(
        'at-rules.media.inverted-colors',
        '"inverted-colors" media feature',
        'Safari 8',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/inverted-colors',
      ),
    },
  ],
});
