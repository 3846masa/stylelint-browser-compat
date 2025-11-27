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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          text-emphasis-position: over right;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected(
        'properties.text-emphasis-position',
        '"text-emphasis-position" property',
        'IE 6',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position',
      ),
    },
  ],
});
