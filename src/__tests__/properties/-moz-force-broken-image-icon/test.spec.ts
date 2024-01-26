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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -moz-force-broken-image-icon: 1;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected(
        '"-moz-force-broken-image-icon" property',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/-moz-force-broken-image-icon',
      ),
    },
  ],
});
