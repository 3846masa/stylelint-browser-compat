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
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          animation-name: none;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 17,
      message: messages.rejected(
        '"animation-name" property',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/animation-name',
      ),
    },
  ],
});
