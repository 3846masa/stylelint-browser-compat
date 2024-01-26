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
        features: ['at-rules.counter-style'],
      },
      browserslist: 'firefox 32',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @counter-style thumbs {
          speak-as: auto;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 11,
      message: messages.rejected(
        '"speak-as" descriptor of the @counter-style',
        'Firefox 32',
        'https://developer.mozilla.org/docs/Web/CSS/@counter-style/speak-as',
      ),
    },
  ],
});
