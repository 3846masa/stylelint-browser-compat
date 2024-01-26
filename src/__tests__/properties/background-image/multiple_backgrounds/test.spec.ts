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
        #id {
          background-image: url('./image.png'), url('./image2.png');
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 60,
      message: messages.rejected('Multiple backgrounds', 'IE 8', ''),
    },
  ],
});
