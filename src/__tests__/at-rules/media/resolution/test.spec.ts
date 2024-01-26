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
      browserslist: 'chrome 28',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (resolution: 150dpi) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected(
        '"resolution" media feature',
        'Chrome 28',
        'https://developer.mozilla.org/docs/Web/CSS/@media/resolution',
      ),
    },
    {
      code: stripIndent`
        @media (min-resolution: 72dpi) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 23,
      message: messages.rejected(
        '"min-resolution" media feature',
        'Chrome 28',
        'https://developer.mozilla.org/docs/Web/CSS/@media/resolution',
      ),
    },
    {
      code: stripIndent`
        @media (max-resolution: 300dpi) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 23,
      message: messages.rejected(
        '"max-resolution" media feature',
        'Chrome 28',
        'https://developer.mozilla.org/docs/Web/CSS/@media/resolution',
      ),
    },
  ],
});
