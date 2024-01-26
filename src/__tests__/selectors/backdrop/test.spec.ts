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
      browserslist: 'firefox 46',
    },
  ],
  reject: [
    {
      code: stripIndent`
        video::backdrop {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 16,
      message: messages.rejected(
        '"::backdrop" pseudo-element',
        'Firefox 46',
        'https://developer.mozilla.org/docs/Web/CSS/::backdrop',
      ),
    },
  ],
});
