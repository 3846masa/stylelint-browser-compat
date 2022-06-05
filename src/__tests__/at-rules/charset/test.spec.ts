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
      browserslist: 'safari 3.2',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @charset 'UTF-8';
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 9,
      message: messages.rejected(
        '"@charset" at rules',
        'Safari 3.2',
        'https://developer.mozilla.org/docs/Web/CSS/@charset',
      ),
    },
  ],
});
