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
        features: ['types.url'],
      },
      browserslist: 'op_mob 12',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: url('./image.png');
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 19,
      message: messages.rejected(
        '"background-image" property',
        'Opera Android 12',
        'https://developer.mozilla.org/docs/Web/CSS/background-image',
      ),
    },
  ],
});
