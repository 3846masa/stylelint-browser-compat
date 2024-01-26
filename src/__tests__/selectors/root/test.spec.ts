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
        :root {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 6,
      message: messages.rejected('":root" pseudo-class', 'IE 8', 'https://developer.mozilla.org/docs/Web/CSS/:root'),
    },
  ],
});
