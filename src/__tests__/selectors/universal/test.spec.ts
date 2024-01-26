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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        * {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 2,
      message: messages.rejected(
        'Universal selector',
        'IE 6',
        'https://developer.mozilla.org/docs/Web/CSS/Universal_selectors',
      ),
    },
  ],
});
