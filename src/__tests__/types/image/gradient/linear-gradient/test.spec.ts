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
      browserslist: 'chrome 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: linear-gradient(45deg, blue, red);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 54,
      message: messages.rejected(
        '"linear-gradient()" function',
        'Chrome 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient/linear-gradient',
      ),
    },
  ],
});
