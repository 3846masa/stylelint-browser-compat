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
      browserslist: 'firefox 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          zoom: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 7,
      message: messages.rejected('"zoom" property', 'Firefox 100', 'https://developer.mozilla.org/docs/Web/CSS/zoom'),
    },
  ],
});
