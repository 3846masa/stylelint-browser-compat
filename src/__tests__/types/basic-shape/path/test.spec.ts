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
        features: ['properties.clip-path.path'],
      },
      browserslist: 'chrome 45',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          clip-path: path('M 50,245 A 160,160 0,0,1 360,120 z');
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 56,
      message: messages.rejected(
        '"path()" function',
        'Chrome 45',
        'https://developer.mozilla.org/docs/Web/CSS/basic-shape/path',
      ),
    },
  ],
});
