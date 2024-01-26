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
      browserslist: 'chrome 80',
      allow: {
        features: ['properties.color-scheme'],
      },
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color-scheme: only dark;
        }
      `,
      line: 2,
      column: 17,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"only dark" keyword specified as color-scheme', 'Chrome 80', ''),
    },
  ],
});
