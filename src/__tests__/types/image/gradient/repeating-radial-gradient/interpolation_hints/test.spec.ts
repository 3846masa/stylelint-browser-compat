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
      browserslist: 'chrome 39',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: repeating-radial-gradient(#e66465, 25%, #9198e5 50%);
        }
      `,
      line: 2,
      column: 56,
      endLine: 2,
      endColumn: 59,
      message: messages.rejected('Interpolation hints for repeating-radial-gradient()', 'Chrome 39', ''),
    },
  ],
});
