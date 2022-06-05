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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        a[href*="value"] {
        }
      `,
      line: 1,
      column: 2,
      endLine: 1,
      endColumn: 17,
      message: messages.rejected(
        'Attribute selector',
        'IE 6',
        'https://developer.mozilla.org/docs/Web/CSS/Attribute_selectors',
      ),
    },
  ],
});
