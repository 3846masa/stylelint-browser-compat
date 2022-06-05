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
        features: ['properties.transform', 'properties.transform-function.rotate', 'types.transform-function.rotate'],
      },
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transform: rotate(3.1416rad);
        }
      `,
      line: 2,
      column: 27,
      endLine: 2,
      endColumn: 30,
      message: messages.rejected('"rad" unit', 'IE 8', 'https://developer.mozilla.org/docs/Web/CSS/angle#rad'),
    },
  ],
});
