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
      browserslist: 'chrome 71',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: conic-gradient(from 45deg, blue 25% 50%, red);
        }
      `,
      line: 2,
      column: 48,
      endLine: 2,
      endColumn: 60,
      message: messages.rejected('Double-position color stops for conic-gradient()', 'Chrome 71', ''),
    },
  ],
});
