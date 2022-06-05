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
        features: ['at-rules.counter-style'],
      },
      browserslist: 'chrome 90',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @counter-style thumbs {
          fallback: lower-alpha;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 11,
      message: messages.rejected(
        '"fallback" descriptor of the @counter-style',
        'Chrome 90',
        'https://developer.mozilla.org/docs/Web/CSS/@counter-style/fallback',
      ),
    },
  ],
});
