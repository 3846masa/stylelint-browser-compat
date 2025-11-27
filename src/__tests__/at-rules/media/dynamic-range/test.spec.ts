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
      browserslist: 'chrome 97',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (dynamic-range: standard) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 22,
      message: messages.rejected(
        'at-rules.media.dynamic-range',
        '"dynamic-range" media feature',
        'Chrome 97',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/dynamic-range',
      ),
    },
  ],
});
