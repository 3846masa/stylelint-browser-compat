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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          scroll-margin-inline-start: 10px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected(
        '"scroll-margin-inline-start" property',
        'IE 6',
        'https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-start',
      ),
    },
  ],
});
