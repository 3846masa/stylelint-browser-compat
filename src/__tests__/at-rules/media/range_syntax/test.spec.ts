/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'firefox 62',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (30em <= width <= 50em) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 30,
      message: messages.rejected(
        'Range syntax for media queries',
        'Firefox 62',
        'https://developer.mozilla.org/docs/Web/CSS/CSS_media_queries/Using_media_queries#syntax_improvements_in_level_4',
      ),
    },
  ],
});
