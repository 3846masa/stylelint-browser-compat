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
      browserslist: 'edge 18',
    },
  ],
  reject: [
    {
      code: stripIndent`
        .class::-webkit-search-results-button {
        }
      `,
      line: 1,
      column: 7,
      endLine: 1,
      endColumn: 38,
      message: messages.rejected(
        '"::-webkit-search-results-button" pseudo-element',
        'Edge 18',
        'https://developer.mozilla.org/docs/Web/CSS/::-webkit-search-results-button',
      ),
    },
  ],
});
