/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, plugin, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [plugin],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'ios_saf 14',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -webkit-overflow-scrolling: touch;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected(
        '"-webkit-overflow-scrolling" property',
        'iOS Safari 14.0-14.4',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-overflow-scrolling',
      ),
    },
  ],
});
