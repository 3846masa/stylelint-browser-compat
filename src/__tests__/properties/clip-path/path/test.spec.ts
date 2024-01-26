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
      allow: {
        features: ['types.basic-shape.path'],
      },
      browserslist: 'firefox 70',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          clip-path: path("M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80");
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 69,
      message: messages.rejected('"path()" function specified as clip-path', 'Firefox 70', ''),
    },
  ],
});
