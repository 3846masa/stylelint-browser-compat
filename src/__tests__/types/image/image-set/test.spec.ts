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
        features: ['properties.background-image.image-set'],
      },
      browserslist: 'chrome 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: image-set(url("./image.jpg") 1x, url("./image@2x.jpg") 2x);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 79,
      message: messages.rejected(
        '"image-set()" function',
        'Chrome 20',
        'https://developer.mozilla.org/docs/Web/CSS/image/image-set',
      ),
    },
  ],
});
