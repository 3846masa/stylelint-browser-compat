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
        features: ['properties.transition-timing-function'],
      },
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 63,
      message: messages.rejected('"cubic-bezier()" function', 'IE 9', ''),
    },
  ],
});
