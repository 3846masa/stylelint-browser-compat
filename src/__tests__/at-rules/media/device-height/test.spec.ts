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
        @media (device-height: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 22,
      message: messages.rejected(
        '"device-height" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/device-height',
      ),
    },
    {
      code: stripIndent`
        @media (min-device-height: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 26,
      message: messages.rejected(
        '"min-device-height" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/device-height',
      ),
    },
    {
      code: stripIndent`
        @media (max-device-height: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 26,
      message: messages.rejected(
        '"max-device-height" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/device-height',
      ),
    },
  ],
});
