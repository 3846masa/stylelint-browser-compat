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
      browserslist: 'ios_saf 7',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          alt: "";
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 6,
      message: messages.rejected(
        '"alt" property',
        'iOS Safari 7.0-7.1',
        'https://developer.mozilla.org/docs/Web/CSS/alt',
      ),
    },
  ],
});
