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
        features: ['properties.filter'],
      },
      browserslist: 'chrome 17',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          filter: hue-rotate(90deg);
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 28,
      message: messages.rejected(
        '"hue-rotate()" function',
        'Chrome 17',
        'https://developer.mozilla.org/docs/Web/CSS/filter-function/hue-rotate',
      ),
    },
  ],
});
