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
      browserslist: 'op_mob 10',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          font-variant: small-caps;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"font-variant" property',
        'Opera Android 10',
        'https://developer.mozilla.org/docs/Web/CSS/font-variant',
      ),
    },
  ],
});
