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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          animation-timeline: none;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected(
        '"animation-timeline" property',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/animation-timeline',
      ),
    },
  ],
});
