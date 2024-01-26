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
      browserslist: 'ie 10',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-image: url('./image.png') 30;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"border-image" property',
        'IE 10',
        'https://developer.mozilla.org/docs/Web/CSS/border-image',
      ),
    },
  ],
});
