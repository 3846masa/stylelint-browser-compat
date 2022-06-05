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
      browserslist: 'chrome 36',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          clip-path: polygon(50% 2.4%, 34.5% 33.8%, 0% 38.8%, 25% 63.1%, 19.1% 97.6%, 50% 81.3%, 80.9% 97.6%, 75% 63.1%, 100% 38.8%, 65.5% 33.8%);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 138,
      message: messages.rejected(
        '"polygon()" function',
        'Chrome 36',
        'https://developer.mozilla.org/docs/Web/CSS/basic-shape/polygon',
      ),
    },
  ],
});
