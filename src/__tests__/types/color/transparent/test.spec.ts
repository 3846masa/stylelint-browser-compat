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
        #id {
          color: transparent;
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected(
        '"transparent" value',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/named-color#transparent',
      ),
    },
  ],
});
