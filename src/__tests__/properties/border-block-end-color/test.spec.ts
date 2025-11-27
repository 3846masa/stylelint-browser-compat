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
          border-block-end-color: green;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected(
        'properties.border-block-end-color',
        '"border-block-end-color" property',
        'Chrome 68',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-block-end-color',
      ),
    },
  ],
});
