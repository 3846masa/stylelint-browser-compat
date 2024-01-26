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
        features: ['at-rules.font-face'],
      },
      browserslist: 'chrome 86',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          line-gap-override: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 20,
      message: messages.rejected(
        '"line-gap-override" descriptor of the @font-face',
        'Chrome 86',
        'https://developer.mozilla.org/docs/Web/CSS/@font-face/line-gap-override',
      ),
    },
  ],
});
