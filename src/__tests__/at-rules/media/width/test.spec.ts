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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (width: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 14,
      message: messages.rejected(
        '"width" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/width',
      ),
    },
    {
      code: stripIndent`
        @media (min-width: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 18,
      message: messages.rejected(
        '"min-width" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/width',
      ),
    },
    {
      code: stripIndent`
        @media (max-width: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 18,
      message: messages.rejected(
        '"max-width" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/width',
      ),
    },
  ],
});
