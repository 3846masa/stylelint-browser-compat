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
        features: ['types.image.element'],
      },
      browserslist: 'firefox 3',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: element(#css-source);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 41,
      message: messages.rejected(
        '"element()" function specified as background-image',
        'Firefox 3',
        'https://developer.mozilla.org/docs/Web/CSS/element()',
      ),
    },
    {
      code: stripIndent`
        #id {
          background: element(#css-source);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected(
        '"element()" function specified as background-image',
        'Firefox 3',
        'https://developer.mozilla.org/docs/Web/CSS/element()',
      ),
    },
  ],
});
