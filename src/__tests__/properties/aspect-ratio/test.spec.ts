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
      browserslist: 'chrome 87',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          aspect-ratio: 1 / 1;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 15,
      message: messages.rejected(
        '"aspect-ratio" property',
        'Chrome 87',
        'https://developer.mozilla.org/docs/Web/CSS/aspect-ratio',
      ),
    },
  ],
});
