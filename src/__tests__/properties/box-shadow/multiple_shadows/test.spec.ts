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
        features: ['properties.box-shadow'],
      },
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          box-shadow: 10px 5px 5px red, 60px -16px teal;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 48,
      message: messages.rejected('Multiple shadows', 'IE 8', ''),
    },
  ],
});
