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
        features: ['types.-moz-image-rect'],
      },
      browserslist: 'firefox 3',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: image-rect(url('./image.png'), 0%, 50%, 50%, 0%);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 69,
      message: messages.rejected(
        '"image-rect()" function specified as background-image',
        'Firefox 3',
        'https://developer.mozilla.org/docs/Web/CSS/-moz-image-rect',
      ),
    },
    {
      code: stripIndent`
        #id {
          background: image-rect(url('./image.png'), 0%, 50%, 50%, 0%);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 63,
      message: messages.rejected(
        '"image-rect()" function specified as background-image',
        'Firefox 3',
        'https://developer.mozilla.org/docs/Web/CSS/-moz-image-rect',
      ),
    },
  ],
});
