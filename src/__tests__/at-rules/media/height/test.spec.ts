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
        @media (height: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        '"height" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/height',
      ),
    },
    {
      code: stripIndent`
        @media (min-height: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected(
        '"min-height" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/height',
      ),
    },
    {
      code: stripIndent`
        @media (max-height: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected(
        '"max-height" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/height',
      ),
    },
  ],
});
