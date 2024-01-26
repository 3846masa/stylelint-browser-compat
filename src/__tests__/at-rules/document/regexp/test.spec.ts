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
      allow: {
        features: ['at-rules.document'],
      },
      browserslist: 'firefox 61',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @document regexp("https:.*") {
        }
      `,
      line: 1,
      column: 11,
      endLine: 1,
      endColumn: 29,
      message: messages.rejected('"regexp()" function of the @document', 'Firefox 61', ''),
    },
  ],
});
