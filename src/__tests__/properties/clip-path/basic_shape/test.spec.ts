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
        features: [
          'types.basic-shape.inset',
          'types.basic-shape.circle',
          'types.basic-shape.ellipse',
          'types.basic-shape.polygon',
        ],
      },
      browserslist: 'firefox 53',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          clip-path: inset(20px 50px 10px 0 round 50px);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 48,
      message: messages.rejected('"inset()" function specified as clip-path', 'Firefox 53', ''),
    },
    {
      code: stripIndent`
        #id {
          clip-path: circle(50%);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('"circle()" function specified as clip-path', 'Firefox 53', ''),
    },
    {
      code: stripIndent`
        #id {
          clip-path: ellipse(40% 50% at left);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 38,
      message: messages.rejected('"ellipse()" function specified as clip-path', 'Firefox 53', ''),
    },
    {
      code: stripIndent`
        #id {
          clip-path: polygon(50% 2.4%, 34.5% 33.8%, 0% 38.8%, 25% 63.1%, 19.1% 97.6%);
        }
      `,
      line: 2,
      column: 14,
      endLine: 2,
      endColumn: 78,
      message: messages.rejected('"polygon()" function specified as clip-path', 'Firefox 53', ''),
    },
  ],
});
