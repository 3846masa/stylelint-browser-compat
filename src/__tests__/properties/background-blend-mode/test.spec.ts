/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'chrome 34',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-blend-mode: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected(
        '"background-blend-mode" property',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/background-blend-mode',
      ),
    },
  ],
});
