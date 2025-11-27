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
      browserslist: 'chrome 41',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (display-mode: fullscreen) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 21,
      message: messages.rejected(
        'at-rules.media.display-mode',
        '"display-mode" media feature',
        'Chrome 41',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/display-mode',
      ),
    },
  ],
});
