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
        features: ['at-rules.font-feature-values'],
      },
      browserslist: 'firefox 33',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-feature-values Font One {
          @ornaments {
          }
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected(
        '"@ornaments" at rules of the @font-feature-values',
        'Firefox 33',
        'https://developer.mozilla.org/docs/Web/CSS/@font-feature-values#@ornaments',
      ),
    },
  ],
});
