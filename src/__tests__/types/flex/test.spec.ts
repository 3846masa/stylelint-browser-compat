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
        features: ['properties.grid-template-columns'],
      },
      browserslist: 'chrome 28',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          grid-template-columns: 1fr;
        }
      `,
      line: 2,
      column: 27,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('"fr" unit', 'Chrome 28', 'https://developer.mozilla.org/docs/Web/CSS/flex_value'),
    },
  ],
});
