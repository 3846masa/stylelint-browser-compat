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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: image('./image.webp#xywh=0,20,40,60');
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 58,
      message: messages.rejected(
        '"image()" function',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/image/image',
      ),
    },
  ],
});
