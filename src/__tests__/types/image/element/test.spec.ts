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
        features: ['properties.background-image.element'],
      },
      browserslist: 'firefox 3',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: element(#background);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 41,
      message: messages.rejected(
        '"element()" function',
        'Firefox 3',
        'https://developer.mozilla.org/docs/Web/CSS/element',
      ),
    },
  ],
});
