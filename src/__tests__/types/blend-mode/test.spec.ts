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
        'types.blend-mode',
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
        'types.blend-mode',
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
        'types.blend-mode',
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
        'types.blend-mode',
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
        'types.blend-mode',
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
        'types.blend-mode',
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
        'types.blend-mode',
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
        'types.blend-mode',
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
        'types.blend-mode',
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
        'types.blend-mode',
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
        'types.blend-mode',
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
      message: messages.rejected(
        'types.blend-mode',
        '"hue" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
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
        'types.blend-mode',
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
      message: messages.rejected(
        'types.blend-mode',
        '"color" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
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
        'types.blend-mode',
        '"luminosity" value',
        'Chrome 34',
        'https://developer.mozilla.org/docs/Web/CSS/blend-mode',
      ),
    },
  ],
});
