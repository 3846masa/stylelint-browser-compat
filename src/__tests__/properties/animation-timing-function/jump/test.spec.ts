/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      allow: {
        features: ['types.easing-function.steps', 'types.easing-function.steps.jump'],
      },
      browserslist: 'chrome 76',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          animation-timing-function: steps(5, jump-start);
        }
      `,
      line: 2,
      column: 39,
      endLine: 2,
      endColumn: 49,
      message: messages.rejected(
        '"jump-start" keyword for steps() specified as animation-timing-function',
        'Chrome 76',
        '',
      ),
    },
    {
      code: stripIndent`
        #id {
          animation-timing-function: steps(5, jump-end);
        }
      `,
      line: 2,
      column: 39,
      endLine: 2,
      endColumn: 47,
      message: messages.rejected(
        '"jump-end" keyword for steps() specified as animation-timing-function',
        'Chrome 76',
        '',
      ),
    },
    {
      code: stripIndent`
        #id {
          animation-timing-function: steps(5, jump-none);
        }
      `,
      line: 2,
      column: 39,
      endLine: 2,
      endColumn: 48,
      message: messages.rejected(
        '"jump-none" keyword for steps() specified as animation-timing-function',
        'Chrome 76',
        '',
      ),
    },
    {
      code: stripIndent`
        #id {
          animation-timing-function: steps(5, jump-both);
        }
      `,
      line: 2,
      column: 39,
      endLine: 2,
      endColumn: 48,
      message: messages.rejected(
        '"jump-both" keyword for steps() specified as animation-timing-function',
        'Chrome 76',
        '',
      ),
    },

    {
      code: stripIndent`
        #id {
          animation: 3s steps(5, jump-start);
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected(
        '"jump-start" keyword for steps() specified as animation-timing-function',
        'Chrome 76',
        '',
      ),
    },
    {
      code: stripIndent`
        #id {
          animation: 3s steps(5, jump-end);
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected(
        '"jump-end" keyword for steps() specified as animation-timing-function',
        'Chrome 76',
        '',
      ),
    },
    {
      code: stripIndent`
        #id {
          animation: 3s steps(5, jump-none);
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected(
        '"jump-none" keyword for steps() specified as animation-timing-function',
        'Chrome 76',
        '',
      ),
    },
    {
      code: stripIndent`
        #id {
          animation: 3s steps(5, jump-both);
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected(
        '"jump-both" keyword for steps() specified as animation-timing-function',
        'Chrome 76',
        '',
      ),
    },
  ],
});
