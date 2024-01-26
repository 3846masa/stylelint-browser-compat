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
      browserslist: 'chrome 68',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: conic-gradient(from 45deg, blue, red);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 58,
      message: messages.rejected(
        '"conic-gradient()" function',
        'Chrome 68',
        'https://developer.mozilla.org/docs/Web/CSS/gradient/conic-gradient',
      ),
    },
  ],
});
