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
        @media (aspect-ratio: 1/1) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 21,
      message: messages.rejected(
        '"aspect-ratio" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/aspect-ratio',
      ),
    },
    {
      code: stripIndent`
        @media (min-aspect-ratio: 1/1) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 25,
      message: messages.rejected(
        '"min-aspect-ratio" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/aspect-ratio',
      ),
    },
    {
      code: stripIndent`
        @media (max-aspect-ratio: 1/1) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 25,
      message: messages.rejected(
        '"max-aspect-ratio" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/aspect-ratio',
      ),
    },
  ],
});
