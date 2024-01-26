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
      browserslist: 'chrome 78',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          font-size: clamp(1rem, 2.5vw, 2rem);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected('"clamp()" function', 'Chrome 78', 'https://developer.mozilla.org/docs/Web/CSS/clamp'),
    },
  ],
});
