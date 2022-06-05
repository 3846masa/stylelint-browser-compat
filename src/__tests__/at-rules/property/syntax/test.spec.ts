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
        features: ['at-rules.property'],
      },
      browserslist: 'chrome 84',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @property --property-name {
          syntax: '<color>';
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 9,
      message: messages.rejected(
        '"syntax" descriptor of the @property',
        'Chrome 84',
        'https://developer.mozilla.org/docs/Web/CSS/@property/syntax',
      ),
    },
  ],
});
