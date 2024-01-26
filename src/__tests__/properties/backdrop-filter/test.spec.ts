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
      browserslist: 'chrome 75',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          backdrop-filter: none;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 18,
      message: messages.rejected(
        '"backdrop-filter" property',
        'Chrome 75',
        'https://developer.mozilla.org/docs/Web/CSS/backdrop-filter',
      ),
    },
  ],
});
