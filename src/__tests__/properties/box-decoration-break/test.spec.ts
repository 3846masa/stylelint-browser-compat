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
      browserslist: 'chrome 21',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          box-decoration-break: slice;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 23,
      message: messages.rejected(
        'properties.box-decoration-break',
        '"box-decoration-break" property',
        'Chrome 21',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/box-decoration-break',
      ),
    },
  ],
});
