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
      browserslist: 'ie 11',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a::before {
          transition: none;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected(
        'selectors.before.animation_and_transition_support',
        'CSS transition for "::before" pseudo-element',
        'IE 11',
        '',
      ),
    },
    {
      code: stripIndent`
        a::before {
          animation: none;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 12,
      message: messages.rejected(
        'selectors.before.animation_and_transition_support',
        'CSS animation for "::before" pseudo-element',
        'IE 11',
        '',
      ),
    },
  ],
});
