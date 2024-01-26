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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
      #id {
        background-image: attr(data-foo url);
      }
    `,
      line: 2,
      column: 35,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected('"url" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
