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
      browserslist: 'chrome 84',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @page {
          page-orientation: upright;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 19,
      message: messages.rejected(
        '"page-orientation" descriptor of the @page',
        'Chrome 84',
        'https://developer.mozilla.org/docs/Web/CSS/@page/page-orientation',
      ),
    },
  ],
});
