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
        features: ['properties.background-image.image-set', 'types.image.image-set'],
      },
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: url('./image.svg');
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected('SVG image as background-image', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          background-image: image-set(url("./image.png") 1x, url("./image@2x.svg") 2x);
        }
      `,
      line: 2,
      column: 58,
      endLine: 2,
      endColumn: 74,
      message: messages.rejected('SVG image as background-image', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          background: url('./image.svg');
        }
      `,
      line: 2,
      column: 19,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected('SVG image as background-image', 'IE 8', ''),
    },
    {
      code: stripIndent`
        #id {
          background: image-set(url("./image.png") 1x, url("./image@2x.svg") 2x);
        }
      `,
      line: 2,
      column: 52,
      endLine: 2,
      endColumn: 68,
      message: messages.rejected('SVG image as background-image', 'IE 8', ''),
    },
  ],
});
