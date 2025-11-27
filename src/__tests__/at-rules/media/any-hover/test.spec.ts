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
        @media (any-hover: hover) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 18,
      message: messages.rejected(
        'at-rules.media.any-hover',
        '"any-hover" media feature',
        'Chrome 40',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/any-hover',
      ),
    },
  ],
});
