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
        features: ['selectors.before', 'properties.content'],
      },
      browserslist: 'ie 7',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id::before {
          content: counter(count);
        }
      `,
      line: 2,
      column: 12,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"counter()" function', 'IE 7', 'https://developer.mozilla.org/docs/Web/CSS/counter'),
    },
  ],
});
