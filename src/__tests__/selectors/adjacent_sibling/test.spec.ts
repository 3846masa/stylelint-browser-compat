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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        p + p {
        }
      `,
      line: 1,
      column: 3,
      endLine: 1,
      endColumn: 4,
      message: messages.rejected(
        'Adjacent sibling combinator',
        'IE 6',
        'https://developer.mozilla.org/docs/Web/CSS/Adjacent_sibling_combinator',
      ),
    },
  ],
});
