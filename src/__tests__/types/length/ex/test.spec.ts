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
        features: ['properties.width'],
      },
      browserslist: 'android 2.1',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          width: 1ex;
        }
      `,
      line: 2,
      column: 11,
      endLine: 2,
      endColumn: 13,
      message: messages.rejected('"ex" unit', 'Android Webview 2.1', ''),
    },
  ],
});
