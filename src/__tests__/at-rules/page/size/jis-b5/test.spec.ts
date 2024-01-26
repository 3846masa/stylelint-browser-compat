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
      browserslist: 'chrome 81',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @page {
          size: jis-b5;
        }
      `,
      line: 2,
      column: 9,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected('"JIS-B5" size', 'Chrome 81', 'https://developer.mozilla.org/docs/Web/CSS/@page/size'),
    },
  ],
});
