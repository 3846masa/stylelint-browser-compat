/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
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
          box-shadow: 12px 12px 2px 1px red;
        }
      `,
      line: 2,
      column: 29,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('Spread radius value specified as box-shadow', 'IE 8', ''),
    },
  ],
});
