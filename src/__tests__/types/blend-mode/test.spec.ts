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
        features: ['properties.background-blend-mode'],
      },
      browserslist: 'chrome 34',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background-blend-mode: multiply;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected(
        '"multiply" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: screen;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected(
        '"screen" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: overlay;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected(
        '"overlay" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: darken;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected(
        '"darken" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: lighten;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 33,
      message: messages.rejected(
        '"lighten" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: color-dodge;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 37,
      message: messages.rejected(
        '"color-dodge" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: color-burn;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected(
        '"color-burn" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: hard-light;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected(
        '"hard-light" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: soft-light;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected(
        '"soft-light" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: difference;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected(
        '"difference" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: exclusion;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 35,
      message: messages.rejected(
        '"exclusion" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: hue;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 29,
      message: messages.rejected('"hue" value', 'Chrome 34', 'https://developer.mozilla.org/docs/Web/CSS/blend-mode'),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: saturation;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected(
        '"saturation" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: color;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 31,
      message: messages.rejected('"color" value', 'Chrome 34', 'https://developer.mozilla.org/docs/Web/CSS/blend-mode'),
    },
    {
      code: stripIndent`
        #id {
          background-blend-mode: luminosity;
        }
      `,
      line: 2,
      column: 26,
      endLine: 2,
      endColumn: 36,
      message: messages.rejected(
        '"luminosity" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
  ],
});
