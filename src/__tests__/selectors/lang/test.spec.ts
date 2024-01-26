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
      browserslist: 'ie 7',
    },
  ],
  reject: [
    {
      code: stripIndent`
        p:lang(en) {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 11,
      message: messages.rejected('":lang" pseudo-class', 'IE 7', 'https://developer.mozilla.org/docs/Web/CSS/:lang'),
    },
  ],
});
