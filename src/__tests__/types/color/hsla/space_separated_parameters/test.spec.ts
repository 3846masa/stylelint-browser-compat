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
      browserslist: 'chrome 64',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: hsla(235 100% 50% / 0.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected('Space-separated hsla() parameters', 'Chrome 64', ''),
    },
  ],
});
