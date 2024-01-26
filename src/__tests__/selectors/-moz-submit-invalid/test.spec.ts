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
      browserslist: 'firefox 2',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :-moz-submit-invalid {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 21,
      message: messages.rejected(
        '":-moz-submit-invalid" pseudo-class',
        'Firefox 2',
        'https://developer.mozilla.org/docs/Web/CSS/:-moz-submit-invalid',
      ),
    },
  ],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'firefox 88',
    },
  ],
  reject: [
    {
      code: stripIndent`
        :-moz-submit-invalid {
        }
      `,
      line: 1,
      column: 1,
      endLine: 1,
      endColumn: 21,
      message: messages.rejected(
        '":-moz-submit-invalid" pseudo-class',
        'Firefox 88',
        'https://developer.mozilla.org/docs/Web/CSS/:-moz-submit-invalid',
      ),
    },
  ],
});
