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
        features: ['properties.background-image.image-rect'],
      },
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: -moz-image-rect(url('./image.png'), 0%, 50%, 50%, 0%);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 74,
      message: messages.rejected(
        '"-moz-image-rect()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/-moz-image-rect',
      ),
    },
  ],
});
