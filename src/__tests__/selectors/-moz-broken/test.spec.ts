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
      browserslist: 'firefox 2',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :-moz-broken {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 13,
      message: messages.rejected(
        '":-moz-broken" pseudo-class',
        'Firefox 2',
        'https://developer.mozilla.org/docs/Web/CSS/:-moz-broken',
      ),
    },
  ],
});
