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
      browserslist: 'chrome 14',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-image-outset: 15px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected(
        'properties.border-image-outset',
        '"border-image-outset" property',
        'Chrome 14',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/border-image-outset',
      ),
    },
  ],
});
