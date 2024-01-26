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
        features: ['properties.border-radius'],
      },
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-radius: 10px / 20px;
        }
      `,
      line: 2,
      column: 18,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('Elliptical borders by border-radius', 'IE 8', ''),
    },
  ],
});
