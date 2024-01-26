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
          box-shadow: inset 10px 5px 5px red;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected('"inset" value specified as box-shadow', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          box-shadow: 10px 5px 5px inset red;
        }
      `,
      line: 2,
      column: 28,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('"inset" value specified as box-shadow', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          box-shadow: 10px 5px 5px red inset;
        }
      `,
      line: 2,
      column: 32,
      endLine: 2,
      endColumn: 37,
      message: messages.rejected('"inset" value specified as box-shadow', 'IE 8', ''),
    },
  ],
});
