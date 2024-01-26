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
        @media (device-width: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 21,
      message: messages.rejected(
        '"device-width" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/device-width',
      ),
    },
    {
      code: stripIndent`
        @media (min-device-width: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 25,
      message: messages.rejected(
        '"min-device-width" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/device-width',
      ),
    },
    {
      code: stripIndent`
        @media (max-device-width: 800px) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 25,
      message: messages.rejected(
        '"max-device-width" media feature',
        'IE 8',
        'https://developer.mozilla.org/docs/Web/CSS/@media/device-width',
      ),
    },
  ],
});
