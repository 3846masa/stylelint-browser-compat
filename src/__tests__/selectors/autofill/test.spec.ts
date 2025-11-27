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
      browserslist: 'firefox 85',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:autofill {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        'selectors.autofill',
        '":autofill" pseudo-class',
        'Firefox 85',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/Selectors/:autofill',
      ),
    },
  ],
});
