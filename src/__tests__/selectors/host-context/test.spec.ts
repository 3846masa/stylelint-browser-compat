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
      browserslist: 'chrome 53',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :host-context(h1) {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 18,
      message: messages.rejected(
        '":host-context" pseudo-class',
        'Chrome 53',
        'https://developer.mozilla.org/docs/Web/CSS/:host-context()',
      ),
    },
  ],
});
