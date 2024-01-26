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
      browserslist: 'firefox 54',
    },
  ],
  reject: [
    {
      code: stripIndent`
        ::cue {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 6,
      message: messages.rejected(
        '"::cue" pseudo-element',
        'Firefox 54',
        'https://developer.mozilla.org/docs/Web/CSS/::cue',
      ),
    },
  ],
});
