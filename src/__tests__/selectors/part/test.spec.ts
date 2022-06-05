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
      browserslist: 'firefox 71',
    },
  ],
  reject: [
    {
      code: stripIndent`
        custom-element::part(ident) {
        }
      `,
      line: 1,
      column: 15,
      endLine: 1,
      endColumn: 28,
      message: messages.rejected(
        '"::part" pseudo-element',
        'Firefox 71',
        'https://developer.mozilla.org/docs/Web/CSS/::part',
      ),
    },
  ],
});
