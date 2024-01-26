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
        svg|a {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 5,
      message: messages.rejected('Namespace selector', 'IE 8', ''),
    },
  ],
});
