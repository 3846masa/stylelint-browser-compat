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
        @media (device-aspect-ratio: 16/9) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 28,
      message: messages.rejected(
        '"device-aspect-ratio" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/device-aspect-ratio',
      ),
    },
    {
      code: stripIndent`
        @media (min-device-aspect-ratio: 16/9) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 32,
      message: messages.rejected(
        '"min-device-aspect-ratio" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/device-aspect-ratio',
      ),
    },
    {
      code: stripIndent`
        @media (max-device-aspect-ratio: 1/1) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 32,
      message: messages.rejected(
        '"max-device-aspect-ratio" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/device-aspect-ratio',
      ),
    },
  ],
});
