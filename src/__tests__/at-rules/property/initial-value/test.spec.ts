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
        features: ['at-rules.property'],
      },
      browserslist: 'chrome 84',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @property --property-name {
          initial-value: #c0ffee;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 16,
      message: messages.rejected(
        '"initial-value" descriptor of the @property',
        'Chrome 84',
        'https://developer.mozilla.org/docs/Web/CSS/@property/initial-value',
      ),
    },
  ],
});
