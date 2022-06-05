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
      browserslist: 'chrome 14',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @page {
          size: 6in;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 7,
      message: messages.rejected(
        '"size" descriptor of the @page',
        'Chrome 14',
        'https://developer.mozilla.org/docs/Web/CSS/@page/size',
      ),
    },
  ],
});
