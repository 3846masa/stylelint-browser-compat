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
      browserslist: 'ie 7',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @page {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 6,
      message: messages.rejected('"@page" at rules', 'IE 7', 'https://developer.mozilla.org/docs/Web/CSS/@page'),
    },
  ],
});
