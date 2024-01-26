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
        features: ['properties.transition-duration'],
      },
      browserslist: 'ie 8',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transition-duration: 1s;
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 26,
      message: messages.rejected('"s" unit', 'IE 8', 'https://developer.mozilla.org/docs/Web/CSS/time'),
    },
    {
      code: stripIndent`
        #id {
          transition-duration: 1ms;
        }
      `,
      line: 2,
      column: 25,
      endLine: 2,
      endColumn: 27,
      message: messages.rejected('"ms" unit', 'IE 8', 'https://developer.mozilla.org/docs/Web/CSS/time'),
    },
  ],
});
