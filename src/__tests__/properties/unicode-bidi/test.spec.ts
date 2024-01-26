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
      browserslist: 'opera 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          unicode-bidi: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"unicode-bidi" property',
        'Opera 9',
        'https://developer.mozilla.org/docs/Web/CSS/unicode-bidi',
      ),
    },
  ],
});
