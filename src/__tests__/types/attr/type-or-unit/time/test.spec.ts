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
        animation-duration: attr(data-foo time);
      }
    `,
      line: 2,
      column: 37,
      endLine: 2,
      endColumn: 41,
      message: messages.rejected('"time" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          animation-duration: attr(data-foo s);
        }
      `,
      line: 2,
      column: 37,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected('"s" unit keyword for attr()', 'Chrome 100', ''),
    },
    {
      code: stripIndent`
        #id {
          animation-duration: attr(data-foo ms);
        }
      `,
      line: 2,
      column: 37,
      endLine: 2,
      endColumn: 39,
      message: messages.rejected('"ms" unit keyword for attr()', 'Chrome 100', ''),
    },
  ],
});
