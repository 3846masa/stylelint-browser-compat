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
        @namespace url(http://www.w3.org/1999/xhtml);
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 11,
      message: messages.rejected(
        '"@namespace" at rules',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@namespace',
      ),
    },
  ],
});
