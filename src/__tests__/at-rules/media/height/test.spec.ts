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
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (height: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 15,
      message: messages.rejected(
        'at-rules.media.height',
        '"height" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/height',
      ),
    },
    {
      code: stripIndent`
        @media (min-height: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected(
        'at-rules.media.height',
        '"min-height" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/height',
      ),
    },
    {
      code: stripIndent`
        @media (max-height: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 19,
      message: messages.rejected(
        'at-rules.media.height',
        '"max-height" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/height',
      ),
    },
  ],
});
