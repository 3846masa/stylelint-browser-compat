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
      browserslist: 'chrome 26',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :scope {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 7,
      message: messages.rejected(
        '":scope" pseudo-class',
        'Chrome 26',
        'https://developer.mozilla.org/docs/Web/CSS/:scope',
      ),
    },
  ],
});
