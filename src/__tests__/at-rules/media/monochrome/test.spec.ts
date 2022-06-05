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
      browserslist: 'ie 11',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (monochrome) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected(
        '"monochrome" media feature',
        'IE 11',
        'https://developer.mozilla.org/docs/Web/CSS/@media/monochrome',
      ),
    },
  ],
});
