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
      browserslist: 'firefox 18',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input::placeholder {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected(
        '"::placeholder" pseudo-element',
        'Firefox 18',
        'https://developer.mozilla.org/docs/Web/CSS/::placeholder',
      ),
    },
  ],
});
