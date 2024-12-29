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
      browserslist: 'chrome 25',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: linear-gradient(0, blue, red);
        }
      `,
      line: 2,
      column: 37,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected(
        'types.gradient.linear-gradient.unitless_0_angle',
        'Unitless 0 angle for linear-gradient()',
        'Chrome 25',
        '',
      ),
    },
  ],
});
