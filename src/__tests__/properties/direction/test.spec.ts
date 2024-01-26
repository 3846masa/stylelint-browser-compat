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
          direction: ltr;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 12,
      message: messages.rejected(
        '"direction" property',
        'Opera 9',
        'https://developer.mozilla.org/docs/Web/CSS/direction',
      ),
    },
  ],
});
