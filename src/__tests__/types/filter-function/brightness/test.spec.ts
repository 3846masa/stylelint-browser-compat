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
        features: ['properties.filter'],
      },
      browserslist: 'chrome 17',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          filter: brightness(1.75);
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected(
        '"brightness()" function',
        'Chrome 17',
        'https://developer.mozilla.org/docs/Web/CSS/filter-function/brightness',
      ),
    },
  ],
});
