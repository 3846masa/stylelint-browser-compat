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
      browserslist: 'firefox 87',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:user-valid {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 17,
      message: messages.rejected(
        '":user-valid" pseudo-class',
        'Firefox 87',
        'https://developer.mozilla.org/docs/Web/CSS/:user-valid',
      ),
    },
  ],
});
