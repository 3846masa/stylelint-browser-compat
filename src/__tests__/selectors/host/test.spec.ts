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
      browserslist: 'chrome 53',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :host {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 6,
      message: messages.rejected(
        '":host" pseudo-class',
        'Chrome 53',
        'https://developer.mozilla.org/docs/Web/CSS/:host',
      ),
    },
  ],
});
