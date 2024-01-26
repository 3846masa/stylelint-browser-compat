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
      browserslist: 'chrome 15',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -webkit-tap-highlight-color: red;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected(
        '"-webkit-tap-highlight-color" property',
        'Chrome 15',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-tap-highlight-color',
      ),
    },
  ],
});
