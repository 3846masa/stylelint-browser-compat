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
      browserslist: 'safari 15.5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -webkit-touch-callout: none;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 24,
      message: messages.rejected(
        '"-webkit-touch-callout" property',
        'Safari 15.5',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-touch-callout',
      ),
    },
  ],
});
