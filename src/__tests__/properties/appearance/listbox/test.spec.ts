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
        features: ['properties.appearance'],
      },
      browserslist: 'ie 5.5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          appearance: listbox;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected('"listbox" value specified as appearance', 'IE 5.5', ''),
    },
  ],
});
