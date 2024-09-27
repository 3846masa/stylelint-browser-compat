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
        features: ['types.image.image-set'],
      },
      browserslist: 'chrome 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: image-set(url("./image.png") 1x, url("./image@2x.png") 2x);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 79,
      message: messages.rejected(
        '"image-set()" function specified as background-image',
        'Chrome 20',
        'https://developer.mozilla.org/docs/Web/CSS/image/image-set',
      ),
    },
    {
      code: stripIndent`
        #id {
          background: image-set(url("./image.png") 1x, url("./image@2x.png") 2x);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 73,
      message: messages.rejected(
        '"image-set()" function specified as background-image',
        'Chrome 20',
        'https://developer.mozilla.org/docs/Web/CSS/image/image-set',
      ),
    },
  ],
});
