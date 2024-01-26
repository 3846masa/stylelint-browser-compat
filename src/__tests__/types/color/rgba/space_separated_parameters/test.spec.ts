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
      browserslist: 'chrome 64',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          color: rgba(255 255 255 / 0.5);
        }
      `,
      line: 2,
      column: 10,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected('Space-separated rgba() parameters', 'Chrome 64', ''),
    },
  ],
});
