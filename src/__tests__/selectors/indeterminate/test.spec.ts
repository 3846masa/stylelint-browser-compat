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
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        input:indeterminate {
        }
      `,
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 20,
      message: messages.rejected(
        '":indeterminate" pseudo-class',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/:indeterminate',
      ),
    },
  ],
});
