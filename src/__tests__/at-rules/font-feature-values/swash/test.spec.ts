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
        features: ['at-rules.font-feature-values'],
      },
      browserslist: 'firefox 33',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-feature-values Font One {
          @swash {
          }
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 9,
      message: messages.rejected(
        '"@swash" at rules of the @font-feature-values',
        'Firefox 33',
        'https://developer.mozilla.org/docs/Web/CSS/@font-feature-values#@swash',
      ),
    },
  ],
});
