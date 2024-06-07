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
      browserslist: 'ie 5.5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        div ~ div {
        }
      `,
      line: 1,
      column: 5,
      endLine: 1,
      endColumn: 6,
      message: messages.rejected(
        'Subsequent-sibling combinator',
        'IE 5.5',
        'https://developer.mozilla.org/docs/Web/CSS/Subsequent-sibling_combinator',
      ),
    },
  ],
});
