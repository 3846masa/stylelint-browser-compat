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
        features: ['selectors.before', 'properties.content'],
      },
      browserslist: 'ie 7',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id::before {
          content: attr(data-foo) " ";
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"attr()" function', 'IE 7', 'https://developer.mozilla.org/docs/Web/CSS/attr'),
    },
  ],
});
