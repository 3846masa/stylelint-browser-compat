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
        features: [
          'types.image.gradient',
          'types.image.gradient.conic-gradient',
          'types.image.gradient.linear-gradient',
          'types.image.gradient.radial-gradient',
          'types.image.gradient.repeating-conic-gradient',
          'types.image.gradient.repeating-linear-gradient',
          'types.image.gradient.repeating-radial-gradient',
        ],
      },
      browserslist: 'ie 9',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-image: conic-gradient(white, black);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 49,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-image: linear-gradient(white, black);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 50,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-image: radial-gradient(white, black);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 50,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-image: repeating-conic-gradient(red 0%, yellow 15%, red 33%);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 74,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-image: repeating-linear-gradient(white, white 20px, black 20px, black 25px);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 89,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-image: repeating-radial-gradient(white, black 20%);
        }
      `,
      line: 2,
      column: 21,
      endLine: 2,
      endColumn: 64,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background: conic-gradient(white, black);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 43,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background: linear-gradient(white, black);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 44,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background: radial-gradient(white, black);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 44,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background: repeating-conic-gradient(red 0%, yellow 15%, red 33%);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 68,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background: repeating-linear-gradient(white, white 20px, black 20px, black 25px);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 83,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
    {
      code: stripIndent`
        #id {
          background: repeating-radial-gradient(white, black 20%);
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 58,
      message: messages.rejected(
        'Gradient function specified as background-image',
        'IE 9',
        'https://developer.mozilla.org/docs/Web/CSS/gradient',
      ),
    },
  ],
});
