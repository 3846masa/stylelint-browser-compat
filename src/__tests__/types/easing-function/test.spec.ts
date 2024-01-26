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
        features: ['properties.transition-timing-function'],
      },
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          transition-timing-function: linear;
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 37,
      message: messages.rejected(
        '"linear" value',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/easing-function',
      ),
    },
    {
      code: stripIndent`
        #id {
          transition-timing-function: ease;
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected('"ease" value', 'IE 9', 'https://developer.mozilla.org/docs/Web/CSS/easing-function'),
    },
    {
      code: stripIndent`
        #id {
          transition-timing-function: ease-in;
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected(
        '"ease-in" value',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/easing-function',
      ),
    },
    {
      code: stripIndent`
        #id {
          transition-timing-function: ease-out;
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 39,
      message: messages.rejected(
        '"ease-out" value',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/easing-function',
      ),
    },
    {
      code: stripIndent`
        #id {
          transition-timing-function: ease-in-out;
        }
      `,
      line: 2,
      column: 31,
      endLine: 2,
      endColumn: 42,
      message: messages.rejected(
        '"ease-in-out" value',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/easing-function',
      ),
    },
  ],
});
