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
      browserslist: 'safari 17',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          scrollbar-width: auto;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 18,
      message: messages.rejected(
        'properties.scrollbar-width',
        '"scrollbar-width" property',
        'Safari 17.0',
        'https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width',
      ),
    },
  ],
});
